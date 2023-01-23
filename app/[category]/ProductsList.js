
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
import { isEmpty } from "lodash";
export default function ProductsList(props) {
  console.log(props)
  if (isEmpty(props.products) || isEmpty(props.category)) {
    return <p>No items found.</p>;
  }
  const productCards = props.products.map(product => {
    // return (
    //   <ProductCard key={product.id} product={product} url={`${props.category.handle}/${product.handle}_${product.id}`} />
    // )
  });
  return (
    <div className={styles.productsListContainer}>
      {/* {productCards} */}
    </div>
  )
}