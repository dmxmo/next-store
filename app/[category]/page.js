import https from 'https';
import { storeName, storeToken } from '@/utils/shopify';
import ProductsList from './ProductsList';
import { isEmpty } from "lodash";
import { Suspense } from 'react';

export async function generateStaticParams() {

  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=handle,title`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    // cache: 'no-cache',
    next: { revalidate: 300 },
  });
  
  const data = await res.json();
  const categories = data?.custom_collections;
  return categories?.map((category) => ({
    category: category?.handle
  }));
}

//
export async function fetchCategory(categoryHandle) {
  // make a request
  const url = `https://${storeName}.myshopify.com/admin/api/2023-01/custom_collections.json?fields=id,handle,title,body_html`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${storeToken}`
    },
    cache: 'no-cache',
    // next: { revalidate: 10 },
  });
  const data = await res.json();

  // find the selected category by handle
  let selectedCategory = null;
  if (!isEmpty(data.custom_collections)) {
    selectedCategory = data.custom_collections.find(category => category?.handle === categoryHandle);
  }

  return selectedCategory;
}

export async function fetchProducts(collectionId) {
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
    // cache: 'no-cache',
    next: { revalidate: 300 },
  });
  const data = await res.json();

  return data?.products;
}

export default async function Category({ params }) {
  const category = await fetchCategory(params?.category);
  const products = await fetchProducts(category?.id);

  return (
    <>
      <h1>{category?.title}</h1>
      <p>{category?.body_html}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList category={category} products={products} />
      </Suspense>
    </>
  )
}