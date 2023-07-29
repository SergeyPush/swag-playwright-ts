import { Locator, Page } from "@playwright/test";
import AbstractPage from "./BasePage";

class CheckoutCompletePage extends AbstractPage {
  private completeHeaderLabel: Locator;
  private completeTextLabel: Locator;
  private backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeaderLabel = page.locator(".complete-header");
    this.completeTextLabel = page.locator(".complete-text");
    this.backHomeButton = page.getByText("Back Home");
  }

  async clickOnBackButton() {
    await this.backHomeButton.click();
  }

  async getCompleteHeaderText() {
    return this.completeHeaderLabel.innerText();
  }
  async getCompleteText() {
    return this.completeTextLabel.innerText();
  }
}

export default CheckoutCompletePage;
