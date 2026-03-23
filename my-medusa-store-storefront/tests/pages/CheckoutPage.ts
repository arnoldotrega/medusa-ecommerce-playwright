import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  readonly path = '/checkout'
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly addressInput: Locator
  readonly cityInput: Locator
  readonly zipInput: Locator
  readonly cardNumberInput: Locator
  readonly cardExpiryInput: Locator
  readonly cardCvvInput: Locator
  readonly placeOrderButton: Locator
  readonly orderConfirmation: Locator
  readonly couponInput: Locator
  readonly applyCouponButton: Locator
  readonly couponError: Locator

  constructor(page: Page) {
    super(page)
    this.firstNameInput   = page.getByTestId('shipping-first-name-input')
    this.lastNameInput    = page.getByTestId('shipping-last-name-input')
    this.addressInput     = page.getByTestId('shipping-address-input')
    this.cityInput        = page.getByTestId('shipping-city-input')
    this.zipInput         = page.getByTestId('shipping-postal-code-input')
    this.cardNumberInput  = page.getByLabel('Card number')
    this.cardExpiryInput  = page.getByLabel('Expiry')
    this.cardCvvInput     = page.getByLabel('CVV')
    this.placeOrderButton = page.getByTestId('submit-order-button')
    this.orderConfirmation = page.getByTestId('order-confirmation')
    this.couponInput      = page.getByTestId('discount-input')
    this.applyCouponButton = page.getByTestId('discount-apply-button')
    this.couponError      = page.getByTestId('coupon-error')
  }

  async fillShippingAddress(data: { firstName: string, lastName: string, address: string, city: string, zip: string }) {
    await this.firstNameInput.fill(data.firstName)
    await this.lastNameInput.fill(data.lastName)
    await this.addressInput.fill(data.address)
    await this.cityInput.fill(data.city)
    await this.zipInput.fill(data.zip)
  }

  async fillPayment(data: { cardNumber: string, expiry: string, cvv: string }) {
    await this.cardNumberInput.fill(data.cardNumber)
    await this.cardExpiryInput.fill(data.expiry)
    await this.cardCvvInput.fill(data.cvv)
  }

  async placeOrder() {
    await this.placeOrderButton.click()
  }
}
