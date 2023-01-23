
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
export default function ProductsList({ products, category }) {
  const productCards = products.map(product => {
    return (
      <ProductCard key={product.id} product={product} url={`${category.handle}/${product.handle}_${product.id}`} />
    )
  });
  return (
    <div className={styles.productsListContainer}>
      {productCards}
    </div>
  )
}