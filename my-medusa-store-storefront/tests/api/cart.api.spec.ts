import { test, expect } from '@playwright/test'

const API_URL = process.env.API_URL || 'http://localhost:9000'

test.describe('Cart API @api', () => {
  test('POST /store/carts creates a cart @api', async ({ request }) => {
    const response = await request.post(API_URL + '/store/carts')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data.cart.id).toBeDefined()
  })

  test('POST /store/carts/:id/line-items adds item to cart @api', async ({
    request,
  }) => {
    const cartResponse = await request.post(API_URL + '/store/carts')
    const cartData = await cartResponse.json()
    const cartId = cartData.cart.id

    const productsResponse = await request.get(API_URL + '/store/products')
    const productsData = await productsResponse.json()
    const variantId = productsData.products[0].variants[0].id

    const response = await request.post(
      API_URL + '/store/carts/' + cartId + '/line-items',
      {
        data: { variant_id: variantId, quantity: 1 },
      },
    )
    expect(response.status()).toBe(200)
  })

  test('POST /store/carts/:id/line-items with invalid variant returns 400 @api', async ({
    request,
  }) => {
    const cartResponse = await request.post(API_URL + '/store/carts')
    const cartData = await cartResponse.json()
    const cartId = cartData.cart.id

    const response = await request.post(
      API_URL + '/store/carts/' + cartId + '/line-items',
      {
        data: { variant_id: 'fake-variant-id', quantity: 1 },
      },
    )
    expect(response.status()).toBe(400)
  })
})
