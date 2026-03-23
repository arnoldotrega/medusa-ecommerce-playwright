import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  readonly path = '/'
  readonly featuredProducts: Locator
  readonly searchInput: Locator
  readonly cartIcon: Locator

  constructor(page: Page) {
    super(page)
    this.featuredProducts = page.getByTestId('featured-products')
    this.searchInput      = page.getByPlaceholder('Search products...')
    this.cartIcon         = page.getByTestId('cart-icon')
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term)
    await this.page.keyboard.press('Enter')
  }
}
