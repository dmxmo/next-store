import styles from "./ProductCard.module.css";
import Image from 'next/image'
import Link from "next/link";
export default function ProductCard({ product, url }) {
  return (
    <div className={styles.productCard}>
      <Link href={url}>
        <Image src={product.image.src} width={product.image.width} height={product.image.height} alt={product.title} />
        <div className={styles.productName}>{product.title}</div>
      </Link>
    </div>
  )
}