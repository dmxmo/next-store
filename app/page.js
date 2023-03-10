import styles from './page.module.css'
export default function Home() {
  return (
    <>
      <h1>pAIntings of the FUTURE</h1>
      <p>
        Welcome to our art gallery store, where you'll find unique and captivating artworks created by DALL-E. Discover a new level of creativity and explore the possibilities of AI art. Elevate your space with our collection of paintings, sculptures, photography and digital art. Browse our selection and find the perfect piece for your home or office today. Thank you for choosing our AI art gallery store.
      </p>
      <p>
        This is a test store using NextJS 13 and the updated "app" directory.<br />
        The data are fetched from Shopify using the Admin API.<br />
        Copies are generated by ChatGPT and images are generated by DALL-E.
      </p>
      <h3>TODO:</h3>
      <ul className={styles.todo}>
        <li>Use <a href="https://www.npmjs.com/package/shopify-buy">Shopify Buy API</a> to create checkout object and the cart page</li>
        <li>Add "/page" on top of the category and displays all the collections or products (paginated)</li>
        <li>Update product page to enable multiple variant options</li>
        <li>Add Tailwind?</li>
        <li>Update the products list page to use <a href="https://codeburst.io/how-to-pure-css-masonry-layouts-a8ede07ba31a">masonry layout</a></li>
        <li>Add "Compare" feature?</li>
      </ul>
    </>
  )
}