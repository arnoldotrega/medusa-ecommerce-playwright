import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * HomePage represents the storefront home page (/).
 * Provides locators for the main navigation elements.
 */
export class HomePage extends BasePage {
  readonly path = '/'

  /** Link to the cart page in the navigation bar */
  readonly cartLink: Locator
  /** Button to open the navigation menu */
  readonly menuLink: Locator
  /** Link to the store homepage (Medusa logo/brand link) */
  readonly medusaHomePageLink: Locator

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    this.cartLink = page.getByTestId('nav-cart-link')
    this.menuLink = page.getByTestId('nav-menu-button')
    this.medusaHomePageLink = page.getByTestId('nav-store-link')
  }
}
