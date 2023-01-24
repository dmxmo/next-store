import styles from "./ProductCard.module.css";
import Image from 'next/image'
import Link from "next/link";
import { isEmpty } from "lodash";

export default function ProductCard(props) {
  if (isEmpty(props.product)) {
    return '';
  }
  return (
    <div className={styles.productCard}>
      <Link href={props.url}>
        <Image src={props.product?.image?.src} width={props.product?.image?.width} height={props.product?.image?.height} alt={props.product?.title} />
        <div className={styles.productName}>{props.product?.title}</div>
      </Link>
    </div>
  )
}