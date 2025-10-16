import { chromium, Page } from "playwright";

/**
 * Common Page Object Model
 * This class represents a common page object model for interacting with web pages.
 * It encapsulates the page and provides methods to interact with it.
 */
export default class CommonPage {
  page: Page | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Create an instance of RepublicActPage
   * @returns {Promise<RepublicActPage>} An instance of RepublicActPage
   */
  static async createInstance() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    return new this(page);
  }

  async close(): Promise<void> {
    await this.page?.context().browser()?.close();
  }
}
