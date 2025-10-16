import ConstitutionPage from "./constitution.page.js";

/**
 * Service for handling Constitution data and operations.
 * This class can be expanded to include methods for fetching, processing,
 * and managing Constitution data.
 */
export default class ConstituionService {
  constitutionPage : ConstitutionPage | undefined;

  constructor(constitutionPage : ConstitutionPage) {
    this.constitutionPage = constitutionPage;
  }
  
  /**
   * Create an instance of RepublicActService
   * @returns {Promise<ConstituionService>} An instance of RepublicActService
   */
  static async createInstance() : Promise<ConstituionService> {
    const republicActPage = await ConstitutionPage.createInstance();
    return new ConstituionService(republicActPage as ConstitutionPage);
  }

  /**
   * Fetch the contents of the 1987 Constitution
   * @returns {Promise<string>} The contents of the Constitution
   */
  async fetchRepublicActContents() : Promise<string> {
    await this.constitutionPage!.goToConstitutionPage();
    const contents = await this.constitutionPage?.getConstitutionContents() || '';
    await this.constitutionPage?.close();
    return contents;
  }
}