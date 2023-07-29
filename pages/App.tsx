import { Locator, Page, expect } from "@playwright/test";
import LoginPage from "./LoginPage";
import MenuPage from "./MenuPage";
import ProductPage from "./ProductPage";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import CheckoutInformation from "./CheckoutInformation";
import CheckoutOverview from "./CheckoutOverview";
import CheckoutCompletePage from "./CheckoutComplete";

class App {
  page: Page;
  private baseUrl: string;
  private titleLabel: Locator;
  loginPage: LoginPage;
  menuPage: MenuPage;
  productsPage: ProductsPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutInfo: CheckoutInformation;
  checkoutOverview: CheckoutOverview;
  checkoutComplete: CheckoutCompletePage;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://www.saucedemo.com/";
    this.titleLabel = this.page.locator("css=.title");
    this.loginPage = new LoginPage(page);
    this.productsPage = new ProductsPage(page);
    this.productPage = new ProductPage(page);
    this.menuPage = new MenuPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutInfo = new CheckoutInformation(page);
    this.checkoutOverview = new CheckoutOverview(page);
    this.checkoutComplete = new CheckoutCompletePage(page);
  }

  async openApp() {
    await this.page.goto(this.baseUrl);
    expect(this.page).toHaveTitle("Swag Labs");
  }

  async getTitle() {
    return this.titleLabel.innerText();
  }
}

export default App;
