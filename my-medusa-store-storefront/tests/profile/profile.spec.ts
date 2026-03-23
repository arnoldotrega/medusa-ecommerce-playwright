import { test, expect } from '../fixtures';
import { validUser } from '../utils/data/users';

test.describe('Profile', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(validUser.email, validUser.password);
  });

  test.describe('Happy path', () => {

    test('should display profile page @profile', async ({ profilePage }) => {
      await profilePage.navigate('/account/profile');
      await expect(profilePage.emailDisplay).toBeVisible();
    });

    test('should update name successfully @profile', async ({ profilePage }) => {
      await profilePage.updateName('Updated', 'Name');
      await expect(profilePage.successMessage).toBeVisible();
    });

    test('should display order history @profile', async ({ profilePage }) => {
      await profilePage.navigate('/account/orders');
      await expect(profilePage.page).toHaveURL(/orders/);
    });

  });

  test.describe('Validations', () => {

    test('should redirect to login if not authenticated @profile', async ({ page }) => {
      await page.goto('/account/profile');
      await expect(page).toHaveURL(/login/);
    });

    test('should show error on invalid email update @profile', async ({ profilePage }) => {
      await profilePage.navigate('/account/profile');
      await profilePage.page.getByLabel('Email').fill('invalidemail');
      await profilePage.saveButton.click();
      await expect(profilePage.page.getByTestId('email-error')).toBeVisible();
    });

  });

});
