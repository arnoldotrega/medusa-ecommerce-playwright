import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  readonly path = '/cart'
  readonly cartItems: Locator
  readonly cartTotal: Locator
  readonly checkoutButton: Locator
  readonly emptyCartMessage: Locator
  readonly quantityInput: Locator
  readonly removeItemButton: Locator

  constructor(page: Page) {
    super(page)
    this.cartItems        = page.getByTestId('cart-item')
    this.cartTotal        = page.getByTestId('cart-total')
    this.checkoutButton   = page.getByTestId('checkout-button')
    this.emptyCartMessage = page.getByTestId('empty-cart')
    this.quantityInput    = page.getByTestId('quantity-input')
    this.removeItemButton = page.getByTestId('remove-item')
  }

  async removeItem(index: number = 0) {
    await this.removeItemButton.nth(index).click()
  }

  async proceedToCheckout() {
    await this.checkoutButton.click()
  }
}
