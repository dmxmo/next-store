'use client';
import styles from './Header.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Header({ categories }) {
  const searchParams = useSearchParams(); // https://beta.nextjs.org/docs/api-reference/use-search-params

  // Work around for Shopify's Dev mode password protection
  const redirectBackToCheckout = searchParams.get('store-logged-in');
  const lastCheckoutUrl = getCookie('lastCheckoutUrl');
  useEffect(() => {
    if (lastCheckoutUrl) {
      if (redirectBackToCheckout !== null && redirectBackToCheckout == 'yes') {
        window.location.replace(lastCheckoutUrl);
      }
      else {
        // remove cookie and do nothing
        deleteCookie('lastCheckoutUrl');
      }
    }
  }, [lastCheckoutUrl]);

  // Build menu links
  let menuLinks = [(<Link key='home' href="/">HOME</Link>)];
  categories?.forEach(function ({ handle, title }) {
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
