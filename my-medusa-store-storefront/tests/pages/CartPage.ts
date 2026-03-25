import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * CartPage represents the shopping cart page (/cart).
 * Provides locators and actions for interacting with cart items,
 * quantities, totals, and checkout navigation.
 */
export class CartPage extends BasePage {
 

  /** A single product row in the cart */
  readonly productRow: Locator
  /** The final total price displayed in the cart */
  readonly cartTotal: Locator
  /** The subtotal before shipping and taxes */
  readonly cartSubTotal: Locator
  /** The shipping cost line item */
  readonly cartShipping: Locator
  /** The taxes line item */
  readonly cartTaxes: Locator
  /** The button to proceed to checkout */
  readonly checkoutButton: Locator
  /** Message displayed when the cart is empty */
  readonly emptyCartMessage: Locator
  /** Button to remove an item from the cart */
  readonly removeItemButton: Locator
  /** Button/link to navigate to the sign-in page */
  readonly signInButton: Locator
  /** The quantity select dropdown for a product (1 to 10)*/
  readonly productQuantityButton: Locator

  /**
   * @param page - Cart page constructor
   */
  constructor(page: Page) {
    super(page)
    this.signInButton          = page.getByTestId('sign-in-button')
    this.productRow            = page.getByTestId('product-row')
    this.cartTotal             = page.getByTestId('cart-total')
    this.cartSubTotal          = page.getByTestId('cart-subtotal')
    this.cartShipping          = page.getByTestId('cart-shipping')
    this.cartTaxes             = page.getByTestId('cart-taxes')
    this.checkoutButton        = page.getByTestId('checkout-button')
    this.emptyCartMessage      = page.getByTestId('empty-cart')
    this.productQuantityButton = page.getByTestId('product-select-button')
    this.removeItemButton      = page.getByTestId('remove-item')
  }

  /**
   * Clicks the remove button for a cart item
   * @param index - Zero-based index of the item to remove (default: 0)
   */
  async removeItem(index: number = 0) {
    await this.removeItemButton.nth(index).click()
  }

  /**
   * Selects a quantity for a cart item using the quantity dropdown.
   * Only accepts values between 1 and 10.
   * @param quantity - The desired quantity (must be 1–10)
   * @param index - Zero-based index of the product row (default: 0)
   * @throws Error if quantity is outside the allowed range
   */
  async selectQuantity(quantity: number, index: number = 0) {
    if (quantity < 1 || quantity > 10) {
      throw new Error(`Quantity must be between 1 and 10, got ${quantity}`)
    }
    await this.productQuantityButton.nth(index).selectOption(String(quantity))
  }

  /**
   * Clicks the checkout button to proceed to the checkout page
   */
  async proceedToCheckout() {
    await this.checkoutButton.click()
  }
}
