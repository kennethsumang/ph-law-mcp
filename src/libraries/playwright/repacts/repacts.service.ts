import { Page } from "playwright"
import RepublicActPage from "./repacts.page.js";

/**
 * Service for handling Republic Acts data and operations.
 * This class can be expanded to include methods for fetching, processing,
 * and managing Republic Acts data.
 */
export default class RepublicActService {
  republicActPage : RepublicActPage | undefined;

  constructor(republicActPage : RepublicActPage) {
    this.republicActPage = republicActPage;
  }
  
  /**
   * Create an instance of RepublicActService
   * @returns {Promise<RepublicActService>} An instance of RepublicActService
   */
  static async createInstance() : Promise<RepublicActService> {
    const republicActPage = await RepublicActPage.createInstance();
    return new RepublicActService(republicActPage);
  }

  /**
   * Fetch the contents of a specific Republic Act by its number.
   * @param {string} raNumber - The number of the Republic Act to fetch.
   * @returns {Promise<string>} The contents of the Republic Act.
   */
  async fetchRepublicActContents(raNumber: string) : Promise<string> {
    await this.republicActPage!.goToRepublicActPage();
    await this.republicActPage!.goToSpecificReplublicAct(raNumber);
    const contents = await this.republicActPage?.getRepublicActContents() || '';
    await this.republicActPage?.close();
    return contents;
  }
}