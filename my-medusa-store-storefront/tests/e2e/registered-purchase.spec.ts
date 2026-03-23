import { test, expect } from '../fixtures';
import { validUser } from '../utils/data/users';
import { validAddress, validCard } from '../utils/data/checkout';

test.describe('E2E - Registered User Purchase @e2e', () => {

  test('logged in user completes full purchase flow @e2e', async ({ loginPage, productListPage, productDetailPage, cartPage, checkoutPage, profilePage }) => {

    // Step 1: Login
    await loginPage.login(validUser.email, validUser.password);
    await expect(loginPage.page).toHaveURL(/account/);

    // Step 2: Browse products
    await productListPage.navigate('/store');
    await productListPage.productCards.first().click();

    // Step 3: Add to cart
    await productDetailPage.addToCart();

    // Step 4: Verify cart
    await cartPage.navigate('/cart');
    await expect(cartPage.cartItems.first()).toBeVisible();

    // Step 5: Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress(validAddress);
    await checkoutPage.fillPayment(validCard);
    await checkoutPage.placeOrder();
    await expect(checkoutPage.orderConfirmation).toBeVisible();

    // Step 6: Verify order in history
    await profilePage.navigate('/account/orders');
    await expect(profilePage.orderHistory.first()).toBeVisible();

  });

});
