import { fetchCategories } from '../Header';

// !IMPORTANT: not sure if this is a bug or feature
// ... but moving generateStaticParams() here from [category]/page.js fixes the issue where
// ... generateStaticParams() doesn't pass params to child generateStaticParams() in [product]/page.js
// ... https://github.com/vercel/next.js/issues/42840
// ... this is using top-bottom approach: https://beta.nextjs.org/docs/api-reference/generate-static-params#generate-segments-from-the-top-down
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category) => ({
    category: category?.handle
  }));
}

// need to create [category]/layout.js to add generateStaticParams()
export default function CategoryLayout({ children }) {
  return (children)
}