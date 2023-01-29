
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";

export default async function ProductsList(props) {
    const products = props?.products;

  // TODO: wrap in Suspense?

  // build product cards
  const productCards = products?.map(product => {
    const productUrl = (`/${props?.category?.handle}/${product?.handle}_${product?.id}`);
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