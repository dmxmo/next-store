import styles from "./page.module.css";
import https from 'https';
import Image from "next/image";
import { storeName, storeToken } from '@/utils/shopify';
import { isEmpty, template } from "lodash";
import { fetchProducts } from "../ProductsList";
import { fetchCategory } from "../page.js";
import { Suspense } from "react";

//
export async function generateStaticParams({ params: { category } }) {
  // Note: params are passed down from the parent generateStaticParams() to here
  // const thisCategory = await fetchCategory(category);
  // const products = await fetchProducts(thisCategory?.id);
  // return products?.map((product) => ({
  //   // category: thisCategory?.handle,
  //   // product: `${product?.handle}_${product?.id}`
  //   category: 'baroque',
  //   product: 'girl-with-a-pearl-earring-johannes-vermeer_8088194711833'
  // }));
  // return [{
  //   // category: thisCategory?.handle,
  //   // product: `${product?.handle}_${product?.id}`
  //   category: 'baroque',
  //   product: 'girl-with-a-pearl-earring-johannes-vermeer_8088194711833'
  // }];


  // make a request
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=id,handle,title,body_html`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    // cache: 'no-cache',
    next: { revalidate: 10 },
  });
  const data = await res.json();

  // find the selected category by handle
  let selectedCategory = null;
  selectedCategory = data?.custom_collections?.find(cat => cat?.handle === category);

  // make a request
  const url2 = `https://${storeName}.myshopify.com/admin/api/2023-01/products.json?collection_id=${selectedCategory?.id}&fields=id,title,handle,description,image`;
  const res2 = await fetch(url2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`,
    },
    // cache: 'no-cache',
    next: { revalidate: 10 },
  });
  const data2 = await res2.json();

  // return data2?.products;
  return data2?.products?.map((product) => ({
    category: selectedCategory?.handle,
    product: `${product?.handle}_${product?.id}`
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
    next: { revalidate: 300 },
  });
  const data = await res.json();

  return data?.product;
}

export default async function ProductPage({ params }) {
  // get id from the url
  const id = params?.product.split('_').pop();

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
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className={styles.title}>{product?.title}</h1>
        <p>{product?.body_html}</p>
        <h3 className={styles.price}>${product?.variants[0]?.price}</h3>
        {buyButton}
      </div>
      <Image src={product?.image?.src} width={product?.image?.width} height={product?.image?.height} alt={product?.title} />
    </Suspense>
  )
}