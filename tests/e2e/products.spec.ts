import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test products page", () => {
  test("Product page is opened", async ({ auth }) => {
    expect(await auth.getTitle()).toBe("Products");
    expect(await auth.productsPage.getProuductListNames()).toHaveLength(6);
  });

  test("Add product to cart", async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    expect(await auth.menuPage.getCartLabelText()).toBe("1");
    await auth.productsPage.addProductToCart(2);
    expect(await auth.menuPage.getCartLabelText()).toBe("2");
    await auth.productsPage.addProductToCart(3);
    expect(await auth.menuPage.getCartLabelText()).toBe("3");

    await auth.productsPage.removeProductFromCart(1);
    expect(await auth.menuPage.getCartLabelText()).toBe("2");
    await auth.productsPage.removeProductFromCart(2);
    expect(await auth.menuPage.getCartLabelText()).toBe("1");
  });

  const prices = [29.99, 9.99, 15.99, 49.99, 7.99, 15.99];
  const cases = [
    {
      name: "Sort Low to High",
      option: "lohi",
      prices: [...prices.sort((a, b) => a - b)],
    },
    {
      name: "Sort High to Low",
      option: "hilo",
      prices: [...prices.sort((a, b) => b - a)],
    },
  ];

  for (const item of cases) {
    test(`Filter products by price ${item.name}`, async ({ auth }) => {
      await auth.productsPage.sortProducts(item.option);
      const prices = await auth.productsPage.getProductListPrices();
      expect(prices).toHaveLength(6);
      expect(prices).toEqual(item.prices);
    });
  }

  test("Open product", async ({ auth }) => {
    const [name, price] = await auth.productsPage.getProductDetailsTexts(1);
    await auth.productsPage.openProuduct(1);
    const proudctName = await auth.productPage.getTitle();
    const productPrice = await auth.productPage.getPrice();

    expect(proudctName).toHaveText(await name);
    expect(await productPrice.innerText()).toEqual(await price);
  });

  test("Open product and add to cart", async ({ auth }) => {
    await auth.productsPage.openProuduct(2);
    await auth.productPage.clickAddToCartButton();
    expect(await auth.menuPage.getCartLabelText()).toEqual("1");
  });

  test("Open product click back button", async ({ auth }) => {
    await auth.productsPage.openProuduct(1);
    await auth.productPage.clickBackButton();
    expect(await auth.getTitle()).toEqual("Products");
  });
});
