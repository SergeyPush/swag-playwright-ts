import { Locator, Page } from "@playwright/test";
import AbstractPage from "./BasePage";

class CartPage extends AbstractPage {
  private cartItem: Locator;
  private checkoutButton: Locator;
  private continueShoppintButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItem = page.locator(".cart_item");
    this.continueShoppintButton = page.getByText("Continue Shopping");
    this.checkoutButton = page.getByRole("button", { name: "checkout" });
  }

  async getCartItems() {
    return this.cartItem.all();
  }

  async getCartItemsNames() {
    return this.cartItem.locator(".inventory_item_name").allInnerTexts();
  }

  async removeCartItem(id: number) {
    await this.cartItem.nth(id).getByText("Remove").click();
  }

  async clickContinueSopping() {
    await this.continueShoppintButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}

export default CartPage;
