import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test checkout overview page", () => {
  test.beforeEach(async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.productsPage.addProductToCart(2);
    await auth.productsPage.addProductToCart(3);
    await auth.menuPage.openCart();
    await auth.cartPage.clickCheckoutButton();
    await auth.checkoutInfo.fillIncormationData("John", "Doe", "123456");
    await auth.checkoutInfo.clickContinueButton();
  });

  test("Products are in checkout overview", async ({ auth }) => {
    expect(await auth.getTitle()).toBe("Checkout: Overview");
    expect(await auth.checkoutOverview.getCartItemsNamesTexts()).toHaveLength(
      3
    );
  });

  test("Total price is counted correctly", async ({ auth }) => {
    const pricesArray = await auth.checkoutOverview.getCartItemsPricesTexts();
    const calculatedSubtotal = pricesArray.reduce((acc, item) => acc + item, 0);
    const calculatedTax = Number((calculatedSubtotal * 0.08).toFixed(2));
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    expect(await auth.checkoutOverview.getSubtotalPriceNumber()).toEqual(
      calculatedSubtotal
    );
    expect(await auth.checkoutOverview.getTaxNumber()).toEqual(calculatedTax);
    expect(await auth.checkoutOverview.getTotalPriceNumber()).toEqual(
      calculatedTotal
    );
  });

  test("Click on Cancel button", async ({ auth }) => {
    await auth.checkoutOverview.clickCanceButton();
    expect(await auth.getTitle()).toBe("Products");
  });

  test("Click Finish button", async ({ auth }) => {
    await auth.checkoutOverview.clickFinishButton();
    expect(await auth.getTitle()).toBe("Checkout: Complete!");
  });
});
