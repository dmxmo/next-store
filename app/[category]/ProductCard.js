import styles from "./ProductCard.module.css";
import Image from 'next/image'
export default function ProductCard({product}) {
  console.log(product)
  return (
    <div className={styles.productCard}>
      <Image src={product.image.src} width={product.image.width} height={product.image.height} alt={product.title} />
      <div className={styles.productName}>{product.title}</div>
    </div>
  )
}