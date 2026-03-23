export const validUser = {
  firstName: 'Test',
  lastName: 'User',
  email: process.env.TEST_USER_EMAIL || 'testuser@gmail.com',
  password: process.env.TEST_USER_PASSWORD || 'TestPass123!'
};

export const invalidUser = {
  email: 'wrong@example.com',
  password: 'wrongpassword'
};

export const newUser = {
  firstName: 'New',
  lastName: 'User',
  email: 'new.user.' + Date.now() + '@gmail.com',
  password: 'NewPass123!'
};
