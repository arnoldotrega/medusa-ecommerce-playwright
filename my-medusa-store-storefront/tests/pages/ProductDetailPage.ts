import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductDetailPage extends BasePage {
  readonly path = '/products'
  readonly productTitle: Locator
  readonly productPrice: Locator
  readonly addToCartButton: Locator
  readonly variantSelector: Locator
  readonly stockError: Locator

  constructor(page: Page) {
    super(page)
    this.productTitle   = page.getByTestId('product-title')
    this.productPrice   = page.getByTestId('product-price')
    this.addToCartButton = page.getByTestId('add-product-button')
    this.variantSelector = page.getByTestId('variant-selector')
    this.stockError      = page.getByTestId('stock-error')
  }

  async addToCart() {
    await this.addToCartButton.click()
  }
}
