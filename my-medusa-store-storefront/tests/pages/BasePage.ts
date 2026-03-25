import { Page } from '@playwright/test'

/**
 * BasePage is the base class for all page objects.
 * All page objects should extend this class to inherit
 * common navigation utilities and the Playwright Page instance.
 */
export class BasePage {
  /** The Playwright Page instance used to interact with the browser */
  readonly page: Page

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    this.page = page
  }


  /**
   * Navigates to the page's own path, prefixed with the country code
   */
  async goto(path: string) {
    await this.page.goto(path)
  }

  
}
