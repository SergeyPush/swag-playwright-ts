import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test login page", () => {
  const DEFAULT_PASSWORD = "secret_sauce";
  const cases = [
    {
      name: "Incorrect credentials",
      username: "username",
      password: "password",
      expected:
        "Epic sadface: Username and password do not match any user in this service",
    },
    {
      name: "Empty username",
      username: "",
      password: "password",
      expected: "Epic sadface: Username is required",
    },
    {
      name: "Empty password",
      username: "username",
      password: "",
      expected: "Epic sadface: Password is required",
    },
  ];

  for (const item of cases) {
    test(`Empty username ${item.name}`, async ({ app }) => {
      await app.loginPage.login(item.username, item.password);
      expect(await app.loginPage.getErrorMessage()).toBeVisible();
      expect(await app.loginPage.getInputErrors()).toHaveCount(2);
      expect(await app.loginPage.getErrorMessageText()).toBe(item.expected);
    });
  }

  test("User can login app successfully", async ({ app }) => {
    await app.loginPage.login("standard_user", DEFAULT_PASSWORD);
    expect(await app.getTitle()).toBe("Products");
  });

  test("Login as locked user", async ({ app }) => {
    await app.loginPage.login("locked_out_user", DEFAULT_PASSWORD);
    expect(await app.loginPage.getErrorMessageText()).toBe(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  // TODO: Add test for Problem user
  // TODO: Add test for Performance glitch user
});
