import { Locator, Page, expect } from "@playwright/test";
import AbstractPage from "./BasePage";
import { stripDollars } from "../helpers/utils.helpers";

class ProductsPage extends AbstractPage {
  // private page: Page;
  private productsList: Locator;
  private filterSelect: Locator;
  private prodcutPricesLabel: Locator;
  private productName: Locator;
  private productListItems: Locator;

  constructor(page: Page) {
    // this.page = page;
    super(page);
    this.productsList = page.locator(".inventory_list");
    this.filterSelect = page.locator(".product_sort_container");
    this.prodcutPricesLabel = page.locator(".inventory_item_price");
    this.productName = page.locator(".inventory_item_name");
    this.productListItems = page.locator(".inventory_item");
  }

  async getProuductListNames() {
    return this.productsList.locator(".inventory_item_name").allInnerTexts();
  }

  async addProductToCart(id: number) {
    await this.productsList
      .locator(".inventory_item")
      .nth(id)
      .getByText("Add to cart")
      .click();

    return this.productListItems
      .nth(id)
      .locator(".inventory_item_name")
      .innerText();
  }
  async removeProductFromCart(id: number) {
    await this.productsList
      .locator(".inventory_item")
      .nth(id)
      .getByText("Remove")
      .click();
  }
  async sortProducts(option: string) {
    await this.filterSelect.selectOption(option);
  }

  async getProductListPrices() {
    const prices = await this.prodcutPricesLabel.allInnerTexts();
    return stripDollars(prices);
  }

  async openProuduct(id: number) {
    await this.productName.nth(id).click();
  }

  async getProductDetailsTexts(id: number) {
    const productName = this.productListItems
      .nth(id)
      .locator(".inventory_item_name")
      .innerText();

    const productPrice = this.productListItems
      .nth(id)
      .locator(".inventory_item_price")
      .innerText();

    return [productName, productPrice];
  }
}

export default ProductsPage;
