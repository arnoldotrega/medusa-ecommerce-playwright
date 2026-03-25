import { test, expect } from '../fixtures'
import { validAddress, validCard } from '../utils/data/checkout'

test.describe('E2E - Guest Purchase @e2e', () => {
  test('guest user completes full purchase flow @e2e', async ({
    productListPage,
    productDetailPage,
    cartPage,
    checkoutPage,
  }) => {
    // Step 1: Browse products
    await productListPage.navigate('/store')
    await expect(productListPage.productCards.first()).toBeVisible()

    // Step 2: Open product detail
    await productListPage.productCards.first().click()
    await expect(productDetailPage.productTitle).toBeVisible()

    // Step 3: Add to cart
    await productDetailPage.addToCart()

    // Step 4: Go to cart and verify
    await cartPage.navigate('/cart')
    await expect(cartPage.cartItems.first()).toBeVisible()

    // Step 5: Proceed to checkout
    await cartPage.proceedToCheckout()

    // Step 6: Fill shipping address
    await checkoutPage.fillShippingAddress(validAddress)

    // Step 7: Fill payment
    await checkoutPage.fillPayment(validCard)

    // Step 8: Place order and verify confirmation
    await checkoutPage.placeOrder()
    await expect(checkoutPage.orderConfirmation).toBeVisible()
  })
})
