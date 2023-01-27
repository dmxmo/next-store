import styles from './Header.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default async function Header(props) {
  let menuLinks = [(<Link key='home' href="/">HOME</Link>)];

  props?.categories.forEach(function ({ handle, title }) {
    menuLinks.push(<Link key={handle} href={handle}>
      {title}
    </Link>)
  });

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
      </div>
      <div className={styles.menu}>
        {menuLinks}
      </div>
    </div>
  )
}
