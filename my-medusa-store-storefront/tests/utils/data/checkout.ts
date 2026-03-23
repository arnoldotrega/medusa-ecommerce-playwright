export const validAddress = {
  firstName: 'Test',
  lastName: 'User',
  address: '123 Main Street',
  city: 'New York',
  zip: '10001',
  country: 'US'
};

export const validCard = {
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/26',
  cvv: '123'
};

export const invalidCard = {
  cardNumber: '1234 1234 1234 1234',
  expiry: '01/20',
  cvv: 'abc'
};

export const validCoupon = 'DISCOUNT10';
export const invalidCoupon = 'INVALIDCODE';
export const expiredCoupon = 'EXPIRED2020';
