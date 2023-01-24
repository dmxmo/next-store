import https from 'https';
import { storeName, storeToken } from '@/utils/shopify';
import ProductsList from './ProductsList';
import { isEmpty } from "lodash";

//
async function fetchCategory(categoryHandle) {
  const agent = new https.Agent({
    rejectUnauthorized: false // bypasses the SSL certificate check, not recommended for production
  });

  // make a request
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=id,handle,title,body_html`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    // cache: 'no-cache',
    // next: { revalidate: 10 },
    agent
  });
  const data = await res.json();

  // find the selected category by handle
  let selectedCategory = null;
  if (!isEmpty(data.custom_collections)) {
    selectedCategory = data.custom_collections.find(category => category?.handle === categoryHandle);
  }
  
  return selectedCategory;
}

export default async function Category({ params }) {
  // const category = await fetchCategory(params?.category);

  // if (isEmpty(category)) {
  //   return (<div>Collection not found</div>)
  // }
  return (
    <>
      <h1>{params.category}</h1>
      {/* <h1>{category?.title}</h1>
      <p>{category?.body_html}</p>
      <ProductsList category={category} /> */}
    </>
  )
}