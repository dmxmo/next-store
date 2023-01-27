// import { fetchProducts } from "../ProductsList";
import { fetchProducts } from "../page.js";
import { fetchCategory } from "../page.js";

//
export async function generateStaticParams({ params: { category } }) {
  // Note: params are passed down from the parent generateStaticParams() to here
  const thisCategory = await fetchCategory(category);
  const products = await fetchProducts(thisCategory?.id);
  return products?.map((product) => ({
    category: thisCategory?.handle,
    product: `${product?.handle}_${product?.id}`
  }));
  
}

// need to create [category]/layout.js to add generateStaticParams()
export default function ProductLayout({ children }) {
  return (children)
}
