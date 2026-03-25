import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * ProductListPage represents the store product listing page (/store).
 * Provides locators and actions for browsing, filtering, and sorting products.
 */
export class ProductListPage extends BasePage {
  readonly path = '/store'

  /** Product card elements displayed in the listing */
  readonly productCards: Locator
 /** Sort option */
  readonly latestArrivals: Locator
 /** Sort option */
  readonly priceDesc: Locator
 /** Sort option */
  readonly priceAsc: Locator

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    this.productCards = page.getByTestId('product-wrapper')
    this.latestArrivals = page.getByTestId('created-at')
    this.priceAsc = page.getByTestId('price-asc')
    this.priceDesc = page.getByTestId('price-desc')
  }

  
 
  /**
   * Selects a sort option from the sort dropdown
   * @param option - The sort option value (e.g. 'price_asc', 'price_desc')
   */
  /**
   * Clicks on a product card to open its detail page
   * @param index - Zero-based index of the product card (default: 0)
   */
  async clickProduct(index: number = 0) {
    await this.productCards.nth(index).click()
  }

  async sortBy(option: 'latest' | 'price-asc' | 'price-desc') {
    const map = {
      'latest': this.latestArrivals,
      'price-asc': this.priceAsc,
      'price-desc': this.priceDesc,
    }
    await map[option].click()
  }
}
