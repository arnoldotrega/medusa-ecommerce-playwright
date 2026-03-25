import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * ProfilePage represents the user account profile page (/account/profile).
 * Provides locators and actions for viewing and updating profile information
 * and reviewing order history.
 */
export class ProfilePage extends BasePage {
  readonly path = '/account/profile'

  /** Input field for the user's first name */
  readonly firstNameInput: Locator
  /** Input field for the user's last name */
  readonly lastNameInput: Locator
  /** Read-only display of the user's email address */
  readonly emailDisplay: Locator
  /** Button to save profile changes */
  readonly saveButton: Locator
  /** Individual order history items */
  readonly orderHistory: Locator
  /** Success message shown after profile is saved */
  readonly successMessage: Locator

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    this.firstNameInput = page.getByTestId('first-name-input')
    this.lastNameInput = page.getByTestId('last-name-input')
    this.emailDisplay = page.getByTestId('profile-email')
    this.saveButton = page.getByTestId('save-button')
    this.orderHistory = page.getByTestId('order-history-item')
    this.successMessage = page.getByTestId('success-message')
  }

  /**
   * Navigates to the profile page, updates the name fields, and saves
   * @param firstName - The new first name
   * @param lastName - The new last name
   */
  async updateName(firstName: string, lastName: string) {
    await this.goto()
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.saveButton.click()
  }
}
