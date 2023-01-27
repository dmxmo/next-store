
import https from 'https';
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
import { storeName, storeToken } from '@/utils/shopify';
import { isEmpty } from "lodash";

// export async function fetchProducts(collectionId) {
//   const agent = new https.Agent({
//     rejectUnauthorized: false // bypasses the SSL certificate check, not recommended for production
//   });

//   // make a request
//   const url = `https://${storeName}.myshopify.com/admin/api/2023-01/products.json?collection_id=${collectionId}&fields=id,title,handle,description,image`;
//   const res = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Shopify-Access-Token': `${storeToken}`,
//     },
//     // cache: 'no-cache',
//     // next: { revalidate: 300 },
//     agent
//   });
//   const data = await res.json();

//   return data?.products;
// }

export default async function ProductsList(props) {
  // fetch products under the selected category
  // const products = await fetchProducts(props.category?.id);
  const products = props?.products;

  // TODO: wrap in Suspense?

  // build product cards
  const productCards = products?.map(product => {
    const productUrl = (`${props?.category?.handle}/${product?.handle}_${product?.id}`);
    return (
      <ProductCard key={product?.id} url={productUrl} product={product} />
    )
  });
  return (
    <div className={styles.productsListContainer}>
      {productCards}
    </div>
  )
}