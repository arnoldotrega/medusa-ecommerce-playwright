import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * CheckoutPage represents the checkout flow page.
 * Provides locators and actions for filling in shipping/billing information,
 * applying coupons, and placing an order.
 */
export class CheckoutPage extends BasePage {
  readonly path = 'shippingcheckout'

  // --- Shipping fields ---
  readonly shippingFirstNameInput: Locator
  readonly shippingLastNameInput: Locator
  readonly shippingAddressInput: Locator
  readonly shippingCompanyInput: Locator
  readonly shippingCityInput: Locator
  readonly shippingPostalCodeInput: Locator
  readonly shippingCountrySelect: Locator
  readonly shippingProvinceInput: Locator
  readonly shippingEmailInput: Locator
  readonly shippingPhoneInput: Locator

  // --- Billing fields ---
  readonly billingFirstNameInput: Locator
  readonly billingLastNameInput: Locator
  readonly billingAddressInput: Locator
  readonly billingCompanyInput: Locator
  readonly billingCityInput: Locator
  readonly billingPostalCodeInput: Locator
  readonly billingCountrySelect: Locator
  readonly billingProvinceInput: Locator
  readonly billingPhoneInput: Locator

  /** Checkbox to use the same shipping address as the billing address */
  readonly billingSameAsShippingCheck: Locator

  // --- Order actions ---
  readonly placeOrderButton: Locator
  readonly orderConfirmation: Locator
  readonly couponInput: Locator
  readonly applyCouponButton: Locator
  readonly couponError: Locator

  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    //Shipping information
    this.shippingFirstNameInput   = page.getByTestId('shipping-first-name-input')
    this.shippingLastNameInput    = page.getByTestId('shipping-last-name-input')
    this.shippingAddressInput     = page.getByTestId('shipping-address-input')
    this.shippingCityInput        = page.getByTestId('shipping-city-input')
    this.shippingCompanyInput     = page.getByTestId('shipping-cpmpany-input')
    this.shippingPostalCodeInput  = page.getByTestId('shipping-postal-code-input')
    this.shippingCountrySelect    = page.getByTestId('shipping-country-select')
    this.shippingProvinceInput    = page.getByTestId('shipping-province-input')
    this.shippingEmailInput       = page.getByTestId('shipping-email-input')
    this.shippingPhoneInput       = page.getByTestId('shipping-phone-input')

    //Billing information
    this.billingFirstNameInput          = page.getByTestId('billing-first-name-input')
    this.billingLastNameInput           = page.getByTestId('billing-last-name-input')
    this.billingAddressInput            = page.getByTestId('billing-address-input')
    this.billingCityInput               = page.getByTestId('billing-city-input')
    this.billingCompanyInput            = page.getByTestId('billing-cpmpany-input')
    this.billingPostalCodeInput         = page.getByTestId('billing-postal-code-input')
    this.billingCountrySelect           = page.getByTestId('billing-country-select')
    this.billingProvinceInput           = page.getByTestId('billing-province-input')
    this.billingPhoneInput              = page.getByTestId('billing-phone-input')
    this.billingSameAsShippingCheck     = page.getByTestId('billing-address-checkbok')
    //Action locators
    this.placeOrderButton  = page.getByTestId('submit-order-button')
    this.orderConfirmation = page.getByTestId('order-confirmation')
    this.couponInput       = page.getByTestId('discount-input')
    this.applyCouponButton = page.getByTestId('discount-apply-button')
    this.couponError       = page.getByTestId('coupon-error')
  }

  /**
   * Fills in the shipping address form.
   * The country value is normalized — special characters are stripped
   * and each word is title-cased (e.g. "united kingdom" → "United Kingdom").
   * Company field is optional
   * @param data - Shipping address fields
   */
  async fillShippingAddress(data:
    {
      firstName: string,
      lastName: string,
      address: string,
      company?: string,
      zip: string,
      city: string,
      country: string,
      province: string,
      email: string,
      phone: string

     }) {
    const normalizedCountry = data.country
      .replace(/[^a-zA-Z\s]/g, '')
      .trim()
      .replace(/\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

    await this.shippingFirstNameInput.fill(data.firstName)
    await this.shippingLastNameInput.fill(data.lastName)
    await this.shippingAddressInput.fill(data.address)
    if (data.company) await this.shippingCompanyInput.fill(data.company)
    await this.shippingPostalCodeInput.fill(data.zip)
    await this.shippingCityInput.fill(data.city)
    await this.shippingCountrySelect.selectOption(normalizedCountry)
    await this.shippingProvinceInput.fill(data.province)
    await this.shippingEmailInput.fill(data.email)
    await this.shippingPhoneInput.fill(data.phone)

  }

  /**
   * Fills in the billing address form.
   * The country value is normalized — special characters are stripped
   * and each word is title-cased (e.g. "france" → "France").
   * @param data - Billing address fields
   */
  async fillBillingAddress(data:
    {
      firstName: string,
      lastName: string,
      address: string,
      company?: string,
      zip: string,
      city: string,
      country: string,
      province: string,
      phone: string

     }) {
    const normalizedCountry = data.country
      .replace(/[^a-zA-Z\s]/g, '')
      .trim()
      .replace(/\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

    await this.billingFirstNameInput.fill(data.firstName)
    await this.billingLastNameInput.fill(data.lastName)
    await this.billingAddressInput.fill(data.address)
    if (data.company) await this.billingCompanyInput.fill(data.company)
    await this.billingPostalCodeInput.fill(data.zip)
    await this.billingCityInput.fill(data.city)
    await this.billingCountrySelect.selectOption(normalizedCountry)
    await this.billingProvinceInput.fill(data.province)
    await this.billingPhoneInput.fill(data.phone)

  }

  /**
   * Checks or unchecks the "billing same as shipping" checkbox.
   * Uses setChecked() which is idempotent — safe to call regardless of current state.
   * @param checked - Whether the checkbox should be checked (default: true)
   */
  async billingSameAsShipping(checked: boolean = true) {
    await this.billingSameAsShippingCheck.setChecked(checked)
  }

  /**
   * Clicks the place order button to submit the order
   */
  async placeOrder() {
    await this.placeOrderButton.click()
  }
}
