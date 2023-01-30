'use client';
import { hasCookie } from 'cookies-next';
import Link from 'next/link';
export default function RedirectToCheckOutPage() {
  const hasLastCheckoutUrl = hasCookie('lastCheckoutUrl');
  return (
    <>
      <h3>Redirecting to checkout...</h3>
      <br />
      {hasLastCheckoutUrl ? <p>Please wait...</p> : <p>There's no item in your cart. Go back <Link href="/">Home &gt;&gt;&gt;</Link></p>}
    </>
  )
}