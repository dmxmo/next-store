
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
export default function ProductsList({products}) {
  const productCards = products.map(product => {
    return (
      <ProductCard key={product.id} product={product} />
    )
  });
  return (
    <div className={styles.productsListContainer}>
      {productCards}
    </div>
  )
}