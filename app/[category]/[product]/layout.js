// import { fetchProducts } from "../ProductsList";
import { fetchProducts } from "../page.js";
import { fetchCategory } from "../page.js";
import { storeName, storeToken } from '@/utils/shopify';

//
export async function generateStaticParams({ params: { category } }) {
  // Note: params are passed down from the parent generateStaticParams() to here
  // const thisCategory = await fetchCategory(category);
  // const products = await fetchProducts(thisCategory?.id);
  // return products?.map((product) => ({
  //   category: thisCategory?.handle,
  //   product: `${product?.handle}_${product?.id}`
  // }));

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
    // agent
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
    // next: { revalidate: 10 },
    // agent
  });
  const data2 = await res2.json();

  // return data2?.products;
  return data2?.products?.map((product) => ({
    category: selectedCategory?.handle,
    product: `${product?.handle}_${product?.id}`
  }));
  
}

// need to create [category]/layout.js to add generateStaticParams()
export default function ProductLayout({ children }) {
  return (children)
}
