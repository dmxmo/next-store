'use client';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
export default function RedirectToCheckOutPage() {
  const lastCheckoutUrl = getCookie('lastCheckoutUrl');
  return (
    <>
      <h3>Redirecting to checkout...</h3>
      <br />
      {!lastCheckoutUrl ? <p>There's no item in your cart. Go back <Link href="/">Home &gt;&gt;&gt;</Link></p> : <p>Please wait...</p>}
    </>
  )
}