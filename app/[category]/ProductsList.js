
import styles from "./ProductsList.module.css";
import ProductCard from "./ProductCard";
import { isEmpty } from "lodash";
export default function ProductsList(props) {
  
  if (isEmpty(props.products)) {
    return (<div>No products</div>)
  }
  
  const productCards = props.products.map(product => {
    return (
      <ProductCard key={product?.id} product={product} url={`${props?.category?.handle}/${product?.handle}_${product?.id}`} />
    )
  });
  return (
    <div className={styles.productsListContainer}>
      {productCards}
    </div>
  )
}