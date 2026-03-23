import { test, expect } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:9000';

test.describe('Products API @api', () => {

  test('GET /store/products returns 200 @api', async ({ request }) => {
    const response = await request.get(API_URL + '/store/products');
    expect(response.status()).toBe(200);
  });

  test('GET /store/products returns array of products @api', async ({ request }) => {
    const response = await request.get(API_URL + '/store/products');
    const data = await response.json();
    expect(Array.isArray(data.products)).toBeTruthy();
    expect(data.products.length).toBeGreaterThan(0);
  });

  test('GET /store/products/:id with valid id returns 200 @api', async ({ request }) => {
    const listResponse = await request.get(API_URL + '/store/products');
    const listData = await listResponse.json();
    const firstId = listData.products[0].id;
    const response = await request.get(API_URL + '/store/products/' + firstId);
    expect(response.status()).toBe(200);
  });

  test('GET /store/products/:id with fake id returns 404 @api', async ({ request }) => {
    const response = await request.get(API_URL + '/store/products/fake-id-xyz');
    expect(response.status()).toBe(404);
  });

});
