import { Locator, Page } from "@playwright/test";
import AbstractPage from "./BasePage";

class MenuPage extends AbstractPage {
  private cartButton: Locator;
  private cartLabel: Locator;
  constructor(page: Page) {
    super(page);
    this.cartButton = page.locator(".shopping_cart_link");
    this.cartLabel = page.locator(".shopping_cart_badge");
  }

  async getCartLabelText() {
    return this.cartLabel.innerText();
  }
  async getCartLabel() {
    return this.cartLabel;
  }

  async openCart() {
    await this.cartButton.click();
  }
}

export default MenuPage;
