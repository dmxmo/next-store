import styles from "./page.module.css";
import https from 'https';
import Image from "next/image";
import { storeName, storeToken } from '@/utils/shopify';
import { isEmpty } from "lodash";

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
    agent
  });
  const data = await res.json();

  return data.product ?? [];
}

export default async function ProductPage({ params }) {
 
  const id = params.product.split('_').pop();
  
  const product = await fetchProduct(id ?? null);
  const checkoutUrl = `https://${storeName}.myshopify.com/cart/${product.variants[0].id}:1`;
  return (
    <>
      <div>
        <h1 className={styles.title}>{product.title}</h1>
        <p>{product.body_html}</p>
        <h3 className={styles.price}>${product.variants[0].price}</h3>
        <a href={checkoutUrl}><button type="button" className={styles.button}>PURCHASE</button></a>
      </div>
      <Image src={product.image.src} width={product.image.width} height={product.image.height} alt={product.title} />
    </>
  )
}