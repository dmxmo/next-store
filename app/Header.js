import https from 'https';
import styles from './Header.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { storeName, storeToken } from '@/utils/shopify';

export async function fetchCategories() {
  const agent = new https.Agent({
    rejectUnauthorized: false // bypasses the SSL certificate check, not recommended for production
  });

  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=handle,title`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    // cache: 'no-cache',
    // next: { revalidate: 300 },
    agent
  });
  const data = await res.json();
  return data?.custom_collections;
}

export default async function Header() {
  const categories = await fetchCategories();
  let menuLinks = [(<Link key='home' href="/">HOME</Link>)];

  if (!isEmpty(categories)) {
    categories.forEach(function ({ handle, title }) {
      menuLinks.push(<Link key={handle} href={handle}>
        {title}
      </Link>)
    });
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
      </div>
      <div className={styles.menu}>
        {menuLinks}
      </div>
    </div>
  )
}
