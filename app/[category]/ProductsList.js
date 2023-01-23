
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
import { isEmpty } from "lodash";
export default function ProductsList({ products, category }) {
  if (isEmpty(products) || isEmpty(products)) {
    return <p>No items found.</p>;
  }
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