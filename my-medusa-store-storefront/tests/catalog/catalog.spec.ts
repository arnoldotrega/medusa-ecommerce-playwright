import { test, expect } from '../fixtures';
import { searchTerms, existingProduct, nonExistentProduct } from '../utils/data/products';

test.describe('Product Catalog', () => {

  test.describe('Happy path', () => {

    test('should display products on store page @catalog @smoke', async ({ productListPage }) => {
      await productListPage.navigate('/store');
      await expect(productListPage.productCards.first()).toBeVisible();
    });

    test('should find product by valid search term @catalog', async ({ homePage, productListPage }) => {
      await homePage.navigate('/');
      await homePage.searchFor(searchTerms.valid);
      await expect(productListPage.productCards.first()).toBeVisible();
    });

    test('should filter products by category @catalog', async ({ productListPage }) => {
      await productListPage.navigate('/store');
      await productListPage.filterBy('shirts');
      await expect(productListPage.productCards.first()).toBeVisible();
    });

    test('should sort products by price low to high @catalog', async ({ productListPage }) => {
      await productListPage.navigate('/store');
      await productListPage.sortBy('price_asc');
      await expect(productListPage.productCards.first()).toBeVisible();
    });

    test('should open product detail page on click @catalog', async ({ productListPage, productDetailPage }) => {
      await productListPage.navigate('/store');
      await productListPage.productCards.first().click();
      await expect(productDetailPage.productTitle).toBeVisible();
      await expect(productDetailPage.productPrice).toBeVisible();
    });

  });

  test.describe('Validations', () => {

    test('should show no results for unknown search term @catalog', async ({ homePage, productListPage }) => {
      await homePage.navigate('/');
      await homePage.searchFor(searchTerms.invalid);
      await expect(productListPage.noResultsMessage).toBeVisible();
    });

    test('should handle XSS in search without crashing @catalog', async ({ homePage }) => {
      await homePage.navigate('/');
      await homePage.searchFor(searchTerms.xss);
      await expect(homePage.page).not.toHaveURL(/error/);
    });

    test('should show 404 for non-existent product URL @catalog', async ({ productDetailPage }) => {
      await productDetailPage.navigate('/products/' + nonExistentProduct.slug);
      await expect(productDetailPage.page).toHaveURL(/404/);
    });

  });

});
