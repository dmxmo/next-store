'use client';
import { getCookie } from 'cookies-next';
export default function RedirectToCheckOutPage() {
  const lastCheckoutUrl = getCookie('lastCheckoutUrl');
  if (!lastCheckoutUrl) {
    window.location.replace('/');
  }
  return (
    <>
      <h1>Redirecting to checkout...</h1>
      <p>Please wait...</p>
    </>
  )
}