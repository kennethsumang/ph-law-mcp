import CommonPage from '../common/common.page.js';

/**
 * Republic Act Page Object Model
 * This class represents the page object model for interacting with Republic Act pages.
 * It encapsulates the page and provides methods to interact with it.
 */
export default class RepublicActPage extends CommonPage{
  /**
   * Go to the Republic Act page
   */
  async goToRepublicActPage() : Promise<void> {
    await this.page!.goto('https://lawphil.net/statutes/repacts/');
  }

  /**
   * Go to a specific Republic Act by its number
   * @param {Number} raNumber 
   */
  async goToSpecificReplublicAct(raNumber: string) : Promise<void> {
    await this.page!.getByText(`Republic Act No. ${raNumber}`).click();
    await this.page!.waitForLoadState('networkidle');
  }

  /**
   * Get the contents of the Republic Act
   * @returns {Promise<string>} The text content of the Republic Act
   */
  async getRepublicActContents() : Promise<string> {
    const textContent = await this.page!.locator('body > center > table > tbody > tr:nth-child(4) > td > blockquote').textContent();
    return textContent || '';
  }
}