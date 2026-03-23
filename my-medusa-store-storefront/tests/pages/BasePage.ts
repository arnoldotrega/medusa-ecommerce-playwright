import { Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly path: string = '/'

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto(this.path)
  }

  async navigate(path: string) {
    await this.page.goto(path)
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle')
  }
}
