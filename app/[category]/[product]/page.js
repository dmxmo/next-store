import styles from "./page.module.css";
import https from 'https';
import Image from "next/image";
import { storeName, storeToken } from '@/utils/shopify';
import { isEmpty } from "lodash";
import { fetchProducts } from "../ProductsList";
import { fetchCategory } from "../page.js";

//
export async function generateStaticParams({ params: { category } }) {
  // Note: params are passed down from the parent generateStaticParams() to here
  const thisCategory = await fetchCategory(category);
  const products = await fetchProducts(thisCategory?.id);
  return products?.map((product) => ({
    category: 'surrealism',
    product: product?.handle
  }));
  
}

//
async function fetchProduct(id) {
  const agent = new https.Agent({
    rejectUnauthorized: false // bypasses the SSL certificate check, not recommended for production
  });

  // make a request
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/products/${id}.json`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`,
    },
    // cache: 'no-cache',
    // next: { revalidate: 60 },
    agent
  });
  const data = await res.json();

  return data?.product;
}

export default async function ProductPage(props) {


  // get id from the url
  const id = props?.params?.product.split('_').pop();
  if (isEmpty(id)) {
    return (<div>Product not found</div>)
  }

  // fetch product
  const product = await fetchProduct(id);

  // create buy button
  const variantId = product?.variants[0]?.id;
  let buyButton = null;
  if (variantId) {
    const checkoutUrl = `https://${storeName}.myshopify.com/cart/${variantId}:1`;
    buyButton = <a href={checkoutUrl}><button type="button" className={styles.button}>PURCHASE</button></a>;
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>{product?.title}</h1>
        <p>{product?.body_html}</p>
        <h3 className={styles.price}>${product?.variants[0]?.price}</h3>
        {buyButton}
      </div>
      <Image src={product?.image?.src} width={product?.image?.width} height={product?.image?.height} alt={product?.title} />
    </>
  )
}