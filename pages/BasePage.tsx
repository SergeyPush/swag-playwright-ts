import { Page } from "@playwright/test";

class AbstractPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

export default AbstractPage;
