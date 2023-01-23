import https from 'https';
import { storeName, storeToken } from '@/utils/shopify';
import ProductsList from './ProductsList';
import { isEmpty } from "lodash";

async function fetchData(categoryHandle) {
  const selectedCategory = await fetchCategory(categoryHandle);
  if (isEmpty(selectedCategory)) {
    return {};
  }

  // fetch products
  const productsList = await fetchProducts(selectedCategory.id);
  if (isEmpty(productsList)) {
    return {};
  }

  // return data
  return { 'category': selectedCategory, 'products': productsList };
}

export default async function Category({ params }) {
  return (<div>Test</div>)
  
  // const data = await fetchData(params.category);
  // if (isEmpty(data)) {
  //   return null;
  // }
  // return (
  //   <>
  //     <h1>{data.category.title}</h1>
  //     <p>{data.category.body_html}</p>
  //     <ProductsList {...data} />
  //   </>
  // )
}

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
    agent
  });
  const data = await res.json();

  // find the selected category by handle
  const selectedCategory = data.custom_collections.find(category => category.handle === categoryHandle);

  return selectedCategory ?? {};
}

async function fetchProducts(collectionId) {
  const agent = new https.Agent({
    rejectUnauthorized: false // bypasses the SSL certificate check, not recommended for production
  });

  // make a request
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/products.json?collection_id=${collectionId}&fields=id,title,handle,description,image`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`,
    },
    agent
  });
  const data = await res.json();

  return data.products ?? [];
}