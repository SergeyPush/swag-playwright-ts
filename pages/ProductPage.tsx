import { Locator, Page } from "@playwright/test";
import AbstractPage from "./BasePage";

class ProductPage extends AbstractPage {
  private titleLabel: Locator;
  private priceLabel: Locator;
  private addToCartButton: Locator;
  private backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleLabel = page.locator(".inventory_details_name");
    this.priceLabel = page.locator(".inventory_details_price");
    this.addToCartButton = page.getByText("Add to cart");
    this.backButton = page.getByText("Back to products");
  }

  async getTitle() {
    return this.titleLabel;
  }
  async getPrice() {
    return this.priceLabel;
  }
  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }
  async clickBackButton() {
    await this.backButton.click();
  }
}

export default ProductPage;
