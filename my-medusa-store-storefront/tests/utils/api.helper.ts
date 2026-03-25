import { APIRequestContext } from '@playwright/test'

/** Base URL for the Medusa backend API. Defaults to localhost:9000 if not set in environment */
const API_URL = process.env.API_URL || 'http://localhost:9000'

/**
 * Creates a new empty cart via the Medusa store API
 * @param request - The Playwright API request context
 * @returns The created cart object
 */
export async function createCart(request: APIRequestContext) {
  const response = await request.post(API_URL + '/store/carts')
  const data = await response.json()
  return data.cart
}

/**
 * Adds a product variant to an existing cart
 * @param request - The Playwright API request context
 * @param cartId - The ID of the cart to add the item to
 * @param variantId - The ID of the product variant to add
 * @param quantity - The quantity to add (default: 1)
 * @returns The raw JSON response from the API
 */
export async function addItemToCart(
  request: APIRequestContext,
  cartId: string,
  variantId: string,
  quantity: number = 1,
) {
  const response = await request.post(
    API_URL + '/store/carts/' + cartId + '/line-items',
    {
      data: { variant_id: variantId, quantity },
    },
  )
  return response.json()
}

/**
 * Retrieves all products from the store
 * @param request - The Playwright API request context
 * @returns An array of product objects
 */
export async function getProducts(request: APIRequestContext) {
  const response = await request.get(API_URL + '/store/products')
  const data = await response.json()
  return data.products
}

/**
 * Deletes a cart by ID
 * @param request - The Playwright API request context
 * @param cartId - The ID of the cart to delete
 * @returns The HTTP status code of the delete response
 */
export async function deleteCart(request: APIRequestContext, cartId: string) {
  const response = await request.delete(API_URL + '/store/carts/' + cartId)
  return response.status()
}

/**
 * Authenticates a user via the store API
 * @param request - The Playwright API request context
 * @param email - The user's email address
 * @param password - The user's password
 * @returns The raw JSON response (includes token/session on success)
 */
export async function loginViaApi(
  request: APIRequestContext,
  email: string,
  password: string,
) {
  const response = await request.post(API_URL + '/store/auth', {
    data: { email, password },
  })
  return response.json()
}
