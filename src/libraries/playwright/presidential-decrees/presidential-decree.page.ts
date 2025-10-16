import CommonPage from "../common/common.page.js";

export interface SearchDecreeKeywordResultRow {
  title: string;
  link: string;
  description: string;
}

/**
 * Page object for the Presidential Decrees page.
 * Extends the CommonPage class to inherit common functionalities.
 */
export default class PresidentialDecreePage extends CommonPage {
  /**
   * Navigates to the Presidential Decrees page.
   * Waits for the page to load completely before proceeding.
   */
  async goToPresidentialDecree() {
    await this.page!.goto('https://lawphil.net/statutes/presdecs/legis_pd.html');
    await this.page!.waitForLoadState('networkidle');
  }

  /**
   * Searches for a specific keyword in the Presidential Decrees.
   * @param {string} keyword 
   * @returns {Promise<SearchDecreeKeywordResultRow[]>} An array of search result rows containing title, link, and description.
   */
  async searchForDecreeKeyword(keyword: string): Promise<SearchDecreeKeywordResultRow[]> {
    await this.page!.locator('input#filterInput').fill(keyword);
    await this.page!.waitForLoadState('networkidle');
    const results = [];
    const resultRows = await this.page!.locator('table#s-menu tbody tr.xy').all();
    for (const row of resultRows) {
      const title = await row.locator('td').nth(0).textContent() || '';
      // Get the first link in the cell (Presidential Decree link)
      const link = await row.locator('td').nth(0).locator('a').first().getAttribute('href') || '';
      const description = await row.locator('td').nth(1).textContent() || '';
      results.push({ title: title.trim(), link, description: description.trim() });
    }
    return results;
  }
}