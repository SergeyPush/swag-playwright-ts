import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test checkout complete button", () => {
  test.beforeEach(async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.productsPage.addProductToCart(2);
    await auth.productsPage.addProductToCart(3);
    await auth.menuPage.openCart();
    await auth.cartPage.clickCheckoutButton();
    await auth.checkoutInfo.fillIncormationData("John", "Doe", "123456");
    await auth.checkoutInfo.clickContinueButton();
    await auth.checkoutOverview.clickFinishButton();
  });

  test("Test checkout complete", async ({ auth }) => {
    expect(await auth.getTitle()).toBe("Checkout: Complete!");
    expect(await auth.checkoutComplete.getCompleteHeaderText()).toBe(
      "Thank you for your order!"
    );
    expect(await auth.checkoutComplete.getCompleteText()).toBe(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  });

  test("Click on Back Home button", async ({ auth }) => {
    await auth.checkoutComplete.clickOnBackButton();
    expect(await auth.getTitle()).toBe("Products");
  });
});
