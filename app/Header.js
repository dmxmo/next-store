import https from 'https';
import styles from './Header.module.css'
import Link from 'next/link';
import { storeName, storeToken } from '@/utils/shopify';

async function getCategories() {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=handle,title`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    agent
  });
  const data = await res.json();
  return data.custom_collections ?? [];
}

export default async function Header() {
  const categories = await getCategories();

  const categoryLinks = categories.map(({ handle, title }) => (
    <Link key={handle} href={handle}>
      {title}
    </Link>
  ))

  return (
    <div className={styles.headerMenu}>
      <Link href="/">HOME</Link>
      {categoryLinks}
    </div>
  )
}
