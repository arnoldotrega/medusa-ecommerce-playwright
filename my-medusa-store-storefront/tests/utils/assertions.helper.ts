import { expect, Page } from '@playwright/test'

/**
 * Asserts that an alert/toast notification is visible and contains the expected text
 * @param page - The Playwright Page instance
 * @param message - The expected text content of the toast
 */
export async function expectToastMessage(page: Page, message: string) {
  await expect(page.getByRole('alert')).toContainText(message)
}

/**
 * Asserts that the current page URL contains the given path segment
 * @param page - The Playwright Page instance
 * @param path - The URL path or pattern to match against
 */
export async function expectUrlToContain(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(path))
}

/**
 * Asserts that an element identified by its data-testid is visible on the page
 * @param page - The Playwright Page instance
 * @param testId - The data-testid attribute value of the element
 */
export async function expectElementVisible(page: Page, testId: string) {
  await expect(page.getByTestId(testId)).toBeVisible()
}

/**
 * Asserts that an element identified by its data-testid is hidden/not visible on the page
 * @param page - The Playwright Page instance
 * @param testId - The data-testid attribute value of the element
 */
export async function expectElementHidden(page: Page, testId: string) {
  await expect(page.getByTestId(testId)).toBeHidden()
}

/**
 * Asserts that the page title matches the expected string (partial match via regex)
 * @param page - The Playwright Page instance
 * @param title - The expected title string or pattern
 */
export async function expectPageTitle(page: Page, title: string) {
  await expect(page).toHaveTitle(new RegExp(title))
}
