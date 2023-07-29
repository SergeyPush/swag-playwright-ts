import { Locator, Page } from "@playwright/test";

class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private errorIcons: Locator;

  constructor(page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorIcons = page.locator('[data-icon="times-circle"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<Locator> {
    return this.errorMessage;
  }

  async getErrorMessageText(): Promise<string> {
    return this.errorMessage.innerText();
  }
  async getInputErrors(): Promise<Locator> {
    return this.errorIcons;
  }
}

export default LoginPage;
