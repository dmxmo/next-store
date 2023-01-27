import './globals.css'
import https from 'https';
import { storeName, storeToken } from '@/utils/shopify';
import Header from './Header'

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
    next: { revalidate: 10 },
    agent
  });
  const data = await res.json();
  return data?.custom_collections;
}

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header categories={categories} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
