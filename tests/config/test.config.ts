import { test as base } from "@playwright/test";
import App from "../../pages/App";
import LoginPage from "../../pages/LoginPage";

type MyFixtures = {
  app: App;
  auth: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.openApp();
    await use(app);
  },

  auth: async ({ app }, use) => {
    await app.loginPage.login("standard_user", "secret_sauce");
    await use(app);
  },
});
