import { Locator, Page } from "@playwright/test";
import { stripDollars } from "../helpers/utils.helpers";

class CheckoutOverview {
  private cartItems: Locator;
  private cartItemsNames: Locator;
  private cartItemsPrices: Locator;
  private priceSubTotalLabel: Locator;
  private taxLabel: Locator;
  private totalPriceLabel: Locator;
  private cancelButton: Locator;
  private finishButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.locator(".cart_item");
    this.cartItemsNames = this.cartItems.locator(".inventory_item_name");
    this.cartItemsPrices = this.cartItems.locator(".inventory_item_price");
    this.priceSubTotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalPriceLabel = page.locator(".summary_total_label");
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.getByRole("button", { name: "finish" });
  }

  async getCartItemsNamesTexts() {
    return this.cartItemsNames.allInnerTexts();
  }
  async getCartItemsPricesTexts() {
    const prices = await this.cartItemsPrices.allInnerTexts();
    return stripDollars(prices);
  }
  async getCartItemsTexts() {
    return this.cartItemsPrices.allInnerTexts();
  }
  async getSubtotalPriceNumber() {
    const subTotal = await this.priceSubTotalLabel.innerText();
    return stripDollars(subTotal);
  }
  async getTaxNumber() {
    const tax = await this.taxLabel.innerText();
    return stripDollars(tax);
  }
  async getTotalPriceNumber() {
    const totalPrice = await this.totalPriceLabel.innerText();
    return stripDollars(totalPrice);
  }
  async clickCanceButton() {
    await this.cancelButton.click();
  }
  async clickFinishButton() {
    await this.finishButton.click();
  }
}

export default CheckoutOverview;
