import { Locator, Page } from "@playwright/test";
import AbstractPage from "./BasePage";

class CheckoutInformation extends AbstractPage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private codeInput: Locator;
  private cancelButton: Locator;
  private continueButton: Locator;
  private errorMessage: Locator;
  private errorInputLabels: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.codeInput = page.locator("[data-test='postalCode']");
    this.cancelButton = page.getByRole("button", { name: "cancel" });
    this.continueButton = page.getByRole("button", { name: "continue" });
    this.errorMessage = page.locator("[data-test='error']");
    this.errorInputLabels = page.locator(".form_group svg");
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async fillIncormationData(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.codeInput.fill(postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async getErrorMessageText() {
    return this.errorMessage.innerText();
  }
}

export default CheckoutInformation;
