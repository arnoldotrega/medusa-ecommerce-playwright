import { test, expect } from '@playwright/test'

const API_URL = process.env.API_URL || 'http://localhost:9000'

test.describe('Auth API @api', () => {
  test('POST /store/auth with valid credentials returns 200 @api', async ({
    request,
  }) => {
    const response = await request.post(API_URL + '/store/auth', {
      data: {
        email: process.env.TEST_USER_EMAIL || 'testuser@gmail.com',
        password: process.env.TEST_USER_PASSWORD || 'TestPass123!',
      },
    })
    expect(response.status()).toBe(200)
  })

  test('POST /store/auth with wrong password returns 401 @api', async ({
    request,
  }) => {
    const response = await request.post(API_URL + '/store/auth', {
      data: { email: 'testuser@gmail.com', password: 'wrongpassword' },
    })
    expect(response.status()).toBe(401)
  })

  test('POST /store/auth with missing fields returns 400 @api', async ({
    request,
  }) => {
    const response = await request.post(API_URL + '/store/auth', {
      data: {},
    })
    expect(response.status()).toBe(400)
  })
})
