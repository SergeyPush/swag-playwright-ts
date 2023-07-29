import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test chekcout info page", () => {
  test.beforeEach(async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.productsPage.addProductToCart(2);
    await auth.menuPage.openCart();
    await auth.cartPage.clickCheckoutButton();
  });
  test("Open Checkout information page", async ({ auth }) => {
    expect(await auth.getTitle()).toBe("Checkout: Your Information");
  });

  test("User can Click cancel button", async ({ auth }) => {
    await auth.checkoutInfo.clickCancelButton();
    expect(await auth.getTitle()).toBe("Your Cart");
  });

  const cases = [
    {
      name: "Empty form",
      firstName: "",
      lastName: "",
      postalCode: "",
      expected: "Error: First Name is required",
    },
    {
      name: "Empty fitst name",
      firstName: "",
      lastName: "Doe",
      postalCode: "22222",
      expected: "Error: First Name is required",
    },
    {
      name: "Empty last name",
      firstName: "John",
      lastName: "",
      postalCode: "22222",
      expected: "Error: Last Name is required",
    },
    {
      name: "Empty postal code",
      firstName: "John",
      lastName: "Doe",
      postalCode: "",
      expected: "Error: Postal Code is required",
    },
  ];

  for (const item of cases) {
    test(`Validate your information form ${item.name}`, async ({ auth }) => {
      const { firstName, lastName, postalCode, expected } = item;
      await auth.checkoutInfo.fillIncormationData(
        firstName,
        lastName,
        postalCode
      );
      await auth.checkoutInfo.clickContinueButton();
      expect(await auth.checkoutInfo.getErrorMessageText()).toBe(expected);
    });
  }

  test("Click on Continue button", async ({ auth }) => {
    await auth.checkoutInfo.fillIncormationData("John", "Doe", "123456");
    await auth.checkoutInfo.clickContinueButton();
    expect(await auth.getTitle()).toBe("Checkout: Overview");
  });
});
