'use client';
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { storeName } from '@/utils/shopify';
import { Suspense } from "react";
import { setCookie } from 'cookies-next';

export default function BuyButton(props) {
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  // Work around for Shopify's Dev mode password protection
  // ... see ../Header.js for more details
  const handleClick = (e) => {
    e.preventDefault();
    setCookie('lastCheckoutUrl', checkoutUrl);
    window.location.href = checkoutUrl;
  }

  // Set checkout URL
  useEffect(() => {
    const variantId = props?.variantId;
    const checkoutUrl = `https://${storeName}.myshopify.com/cart/${variantId}:1`;
    setCheckoutUrl(checkoutUrl);
  }, [props?.variantId]);

  // Build the buy button
  let buyButton = null;
  if (checkoutUrl) {
    buyButton = <a href={checkoutUrl} onClick={(e) => { handleClick(e) }}><button type="button" className={styles.button}>PURCHASE</button></a>;
  }

  return (<Suspense>{buyButton}</Suspense>)
}