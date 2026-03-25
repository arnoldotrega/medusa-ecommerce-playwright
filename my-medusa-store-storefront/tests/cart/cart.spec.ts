import { test, expect } from '../fixtures'

test.describe('Cart', () => {
  test.describe('Happy path', () => {
    test('should add a product to cart  @cart @smoke', async ({
      productListPage,
      productDetailPage,
      cartPage,
    }) => {
      await productListPage.navigate('/store')
      await productListPage.productCards.first().click()
      await productDetailPage.addToCart()
      await cartPage.navigate('/cart')
      await expect(cartPage.cartItems.first()).toBeVisible()
    })

    test('should update quantity in cart  @cart', async ({
      productListPage,
      productDetailPage,
      cartPage,
    }) => {
      await productListPage.navigate('/store')
      await productListPage.productCards.first().click()
      await productDetailPage.addToCart()
      await cartPage.navigate('/cart')
      await cartPage.quantityInput.fill('2')
      await expect(cartPage.cartTotal).toBeVisible()
    })

    test('should remove a product from cart  @cart', async ({
      productListPage,
      productDetailPage,
      cartPage,
    }) => {
      await productListPage.navigate('/store')
      await productListPage.productCards.first().click()
      await productDetailPage.addToCart()
      await cartPage.navigate('/cart')
      await cartPage.removeItem(0)
      await expect(cartPage.emptyCartMessage).toBeVisible()
    })

    test('should persist cart after page reload  @cart', async ({
      productListPage,
      productDetailPage,
      cartPage,
    }) => {
      await productListPage.navigate('/store')
      await productListPage.productCards.first().click()
      await productDetailPage.addToCart()
      await cartPage.page.reload()
      await cartPage.navigate('/cart')
      await expect(cartPage.cartItems.first()).toBeVisible()
    })
  })

  test.describe('Validations', () => {
    test('checkout button should be disabled on empty cart  @cart', async ({
      cartPage,
    }) => {
      await cartPage.navigate('/cart')
      await expect(cartPage.checkoutButton).toBeDisabled()
    })

    test('should not allow negative quantity  @cart', async ({
      productListPage,
      productDetailPage,
      cartPage,
    }) => {
      await productListPage.navigate('/store')
      await productListPage.productCards.first().click()
      await productDetailPage.addToCart()
      await cartPage.navigate('/cart')
      await cartPage.quantityInput.fill('-1')
      await expect(cartPage.quantityInput).not.toHaveValue('-1')
    })

    test('should show stock error when exceeding available stock  @cart', async ({
      productDetailPage,
    }) => {
      await productDetailPage.navigate('/products/medusa-t-shirt')
      await productDetailPage.page.getByTestId('quantity-input').fill('9999')
      await productDetailPage.addToCart()
      await expect(productDetailPage.stockError).toBeVisible()
    })
  })
})
