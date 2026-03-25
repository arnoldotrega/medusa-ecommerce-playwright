/**
 * Test user data used across authentication tests.
 * Credentials for validUser can be overridden via environment variables
 * to avoid hardcoding sensitive data.
 */

/** A valid existing user. Email and password can be set via TEST_USER_EMAIL / TEST_USER_PASSWORD env vars */
export const validUser = {
  firstName: 'Test',
  lastName: 'User',
  email: process.env.TEST_USER_EMAIL || 'testuser@gmail.com',
  password: process.env.TEST_USER_PASSWORD || 'TestPass123!',
}

/** A user with credentials that do not exist in the system — used for negative login tests */
export const invalidUser = {
  email: 'wrong@example.com',
  password: 'wrongpassword',
}

/** A dynamically generated new user with a unique email — used for registration tests */
export const newUser = {
  firstName: 'New',
  lastName: 'User',
  email: 'new.user.' + Date.now() + '@gmail.com',
  password: 'NewPass123!',
}
