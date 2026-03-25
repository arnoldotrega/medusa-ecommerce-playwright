import { test, expect } from '../fixtures'
import {
  validAddress,
  validCard,
  invalidCard,
  invalidCoupon,
} from '../utils/data/checkout'

test.describe('Checkout', () => {
  test.beforeEach(async ({ productListPage, productDetailPage }) => {
    await productListPage.navigate('/store')
    await productListPage.productCards.first().click()
    await productDetailPage.addToCart()
  })

  test.describe('Happy path', () => {
    test('should fill shipping address successfully @checkout', async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.navigate('/cart')
      await cartPage.proceedToCheckout()
      await checkoutPage.fillShippingAddress(validAddress)
      await expect(checkoutPage.page).not.toHaveURL(/error/)
    })

    test('should complete full guest checkout @checkout @smoke', async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.navigate('/cart')
      await cartPage.proceedToCheckout()
      await checkoutPage.fillShippingAddress(validAddress)
      await checkoutPage.fillPayment(validCard)
      await checkoutPage.placeOrder()
      await expect(checkoutPage.orderConfirmation).toBeVisible()
    })
  })

  test.describe('Validations', () => {
    test('should show errors on empty shipping form @checkout', async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.navigate('/cart')
      await cartPage.proceedToCheckout()
      await checkoutPage.placeOrder()
      await expect(checkoutPage.page.getByTestId('address-error')).toBeVisible()
    })

    test('should reject expired credit card @checkout', async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.navigate('/cart')
      await cartPage.proceedToCheckout()
      await checkoutPage.fillShippingAddress(validAddress)
      await checkoutPage.fillPayment(invalidCard)
      await checkoutPage.placeOrder()
      await expect(checkoutPage.page.getByTestId('payment-error')).toBeVisible()
    })

    test('should show error for invalid coupon @checkout', async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.navigate('/cart')
      await cartPage.proceedToCheckout()
      await checkoutPage.couponInput.fill(invalidCoupon)
      await checkoutPage.applyCouponButton.click()
      await expect(checkoutPage.couponError).toBeVisible()
    })

    test('should not allow checkout with empty cart @checkout', async ({
      cartPage,
    }) => {
      await cartPage.navigate('/cart')
      await expect(cartPage.checkoutButton).toBeDisabled()
    })
  })
})
