import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * ProductDetailPage represents an individual product page (/products/...).
 * Provides locators and actions for viewing product details and adding items to the cart.
 */
export class ProductDetailPage extends BasePage {

  /** The product title/name heading */
  readonly productTitle: Locator
  /** The displayed product price */
  readonly productPrice: Locator
  /** Button to add the product to the cart */
  readonly addToCartButton: Locator
  /** Selector for choosing a product variant (size, color, etc.) */
  readonly variantSelector: Locator
  /** Error message shown when the selected variant is out of stock */
  readonly stockError: Locator

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    this.productTitle = page.getByTestId('product-title')
    this.productPrice = page.getByTestId('product-price')
    this.addToCartButton = page.getByTestId('add-product-button')
    this.variantSelector = page.getByTestId('variant-selector')
    this.stockError = page.getByTestId('stock-error')
  }

  /**
   * Clicks the "Add to cart" button to add the current product to the cart
   */
  async addToCart() {
    await this.addToCartButton.click()
  }
}
