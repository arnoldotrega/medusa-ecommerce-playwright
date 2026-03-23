import { APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:9000';

export async function createCart(request: APIRequestContext) {
  const response = await request.post(API_URL + '/store/carts');
  const data = await response.json();
  return data.cart;
}

export async function addItemToCart(
  request: APIRequestContext,
  cartId: string,
  variantId: string,
  quantity: number = 1
) {
  const response = await request.post(API_URL + '/store/carts/' + cartId + '/line-items', {
    data: { variant_id: variantId, quantity }
  });
  return response.json();
}

export async function getProducts(request: APIRequestContext) {
  const response = await request.get(API_URL + '/store/products');
  const data = await response.json();
  return data.products;
}

export async function deleteCart(request: APIRequestContext, cartId: string) {
  const response = await request.delete(API_URL + '/store/carts/' + cartId);
  return response.status();
}

export async function loginViaApi(request: APIRequestContext, email: string, password: string) {
  const response = await request.post(API_URL + '/store/auth', {
    data: { email, password }
  });
  return response.json();
}
