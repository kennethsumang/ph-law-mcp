import PresidentialDecreePage, { SearchDecreeKeywordResultRow } from "./presidential-decree.page.js";

/**
 * Service for handling Presidential Decrees data and operations.
 * This class can be expanded to include methods for fetching, processing,
 * and managing Presidential Decrees data.
 */
export default class PresidentialDecreeService {
  presidentialDecreePage : PresidentialDecreePage | undefined;
  
  constructor(presidentialDecreePage : PresidentialDecreePage) {
    this.presidentialDecreePage = presidentialDecreePage;
  }
  
  /**
   * Create an instance of PresidentialDecreeService
   * @returns {Promise<PresidentialDecreeService>} An instance of PresidentialDecreeService
   */
  static async createInstance() : Promise<PresidentialDecreeService> {
    const presidentialDecreePage = await PresidentialDecreePage.createInstance();
    return new PresidentialDecreeService(presidentialDecreePage as PresidentialDecreePage);
  }

  /**
   * Search for a keyword in Presidential Decrees
   * @param {string} keyword - The keyword to search for
   * @returns {Promise<SearchDecreeKeywordResultRow[]>} An array of search result rows containing title, link, and description.
   */
  async searchForDecreeKeyword(keyword: string) : Promise<SearchDecreeKeywordResultRow[]> {
    await this.presidentialDecreePage!.goToPresidentialDecree();
    const choices = await this.presidentialDecreePage!.searchForDecreeKeyword(keyword);
    await this.presidentialDecreePage?.close();
    return choices;
  }
}
