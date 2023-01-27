// import { fetchCategories } from '../Header';
import https from 'https';
import { storeName, storeToken } from '@/utils/shopify';

// !IMPORTANT: not sure if this is a bug or feature
// ... but moving generateStaticParams() here from [category]/page.js fixes the issue where
// ... generateStaticParams() doesn't pass params to child generateStaticParams() in [product]/page.js
// ... https://github.com/vercel/next.js/issues/42840
// ... this is using top-bottom approach: https://beta.nextjs.org/docs/api-reference/generate-static-params#generate-segments-from-the-top-down
export async function generateStaticParams() {
  // const categories = await fetchCategories();
  // return categories?.map((category) => ({
  //   category: category?.handle
  // }));


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
    // agent
  });
  
  const data = await res.json();
  const categories = data?.custom_collections;
  return categories?.map((category) => ({
    category: category?.handle
  }));
}

// need to create [category]/layout.js to add generateStaticParams()
export default function CategoryLayout({ children }) {
  return (children)
}
