import { expect, Page } from '@playwright/test';

export async function expectToastMessage(page: Page, message: string) {
  await expect(page.getByRole('alert')).toContainText(message);
}

export async function expectUrlToContain(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(path));
}

export async function expectElementVisible(page: Page, testId: string) {
  await expect(page.getByTestId(testId)).toBeVisible();
}

export async function expectElementHidden(page: Page, testId) {
  await expect(page.getByTestId(testId)).toBeHidden();
}

export async function expectPageTitle(page: Page, title: string) {
  await expect(page).toHaveTitle(new RegExp(title));
}
