import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductListPage extends BasePage {
  readonly path = '/store'
  readonly productCards: Locator
  readonly filterCategory: Locator
  readonly sortDropdown: Locator
  readonly noResultsMessage: Locator

  constructor(page: Page) {
    super(page)
    this.productCards      = page.getByTestId('product-card')
    this.filterCategory    = page.getByTestId('category-filter')
    this.sortDropdown      = page.getByTestId('sort-dropdown')
    this.noResultsMessage  = page.getByTestId('no-results')
  }

  async filterBy(category: string) {
    await this.filterCategory.selectOption(category)
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option)
  }
}
