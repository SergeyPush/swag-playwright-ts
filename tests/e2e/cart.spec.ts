import { expect } from "@playwright/test";
import { test } from "../config/test.config";

test.describe("Test cart", () => {
  test("Cart is open", async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.menuPage.openCart();
    expect(await auth.getTitle()).toBe("Your Cart");
  });

  test("User can add product to cart", async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.productsPage.addProductToCart(2);
    await auth.menuPage.openCart();
    expect(await auth.cartPage.getCartItems()).toHaveLength(2);
  });

  test("Check products in cart", async ({ auth }) => {
    const product1 = await auth.productsPage.addProductToCart(1);
    const product2 = await auth.productsPage.addProductToCart(2);
    await auth.menuPage.openCart();

    const productsInCart = await auth.cartPage.getCartItemsNames();
    expect(productsInCart).toEqual([product1, product2]);
  });

  test("Remove product from cart", async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.productsPage.addProductToCart(2);
    await auth.menuPage.openCart();
    expect(await auth.cartPage.getCartItems()).toHaveLength(2);
    await auth.cartPage.removeCartItem(1);
    expect(await auth.cartPage.getCartItems()).toHaveLength(1);
  });

  test("Continue shopping", async ({ auth }) => {
    await auth.productsPage.addProductToCart(1);
    await auth.menuPage.openCart();
    expect(await auth.cartPage.getCartItems()).toHaveLength(1);
    await auth.cartPage.clickContinueSopping();
    expect(await auth.getTitle()).toBe("Products");
  });
});
