
import https from 'https';
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
import { storeName, storeToken } from '@/utils/shopify';
import { isEmpty } from "lodash";

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
    next: { revalidate: 10 }, // revalidate every 10 seconds
    agent
  });
  const data = await res.json();

  return data?.products;
}

export default async function ProductsList(props) {
  // fetch products under the selected category
  const products = await fetchProducts(props.category?.id);

  if (isEmpty(products)) {
    return (<div>No products found</div>);
  }

  // build product cards
  const productCards = products.map(product => {
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