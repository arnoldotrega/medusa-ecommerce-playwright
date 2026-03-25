/**
 * Test product data used across catalog and product tests.
 */

/** A product that is expected to exist in the store */
export const existingProduct = {
  name: 'Medusa T-Shirt',
  slug: 'medusa-t-shirt',
}

/** A product slug that should not exist — used for 404/empty state tests */
export const nonExistentProduct = {
  slug: 'this-product-does-not-exist-xyz',
}

/** Search terms used in catalog search tests */
export const searchTerms = {
  /** A term that should return results */
  valid: 'shirt',
  /** A term that should return no results */
  invalid: 'xyzproductnotfound999',
  /** An XSS payload to test that the search input sanitizes user input */
  xss: '<script>alert(1)</script>',
}
