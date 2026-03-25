import { test, expect } from '../fixtures'
import { validAddress, validCard, validCoupon } from '../utils/data/checkout'

test.describe('E2E - Coupon Purchase @e2e', () => {
  test('user completes purchase with valid coupon @e2e', async ({
    productListPage,
    productDetailPage,
    cartPage,
    checkoutPage,
  }) => {
    // Step 1: Add product to cart
    await productListPage.navigate('/store')
    await productListPage.productCards.first().click()
    await productDetailPage.addToCart()

    // Step 2: Go to checkout
    await cartPage.navigate('/cart')
    await cartPage.proceedToCheckout()

    // Step 3: Apply coupon
    await checkoutPage.couponInput.fill(validCoupon)
    await checkoutPage.applyCouponButton.click()
    await expect(checkoutPage.couponError).toBeHidden()

    // Step 4: Complete purchase
    await checkoutPage.fillShippingAddress(validAddress)

    await checkoutPage.placeOrder()
    await expect(checkoutPage.orderConfirmation).toBeVisible()
  })
})
