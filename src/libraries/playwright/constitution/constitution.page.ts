import CommonPage from "../common/common.page.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from "mcp-framework";

/**
 * Constitution Page Object Model
 * This class represents the page object model for interacting with Constitution pages.
 * It encapsulates the page and provides methods to interact with it.
 */
export default class ConstitutionPage extends CommonPage {
  /**
   * Go to the Constitution page
   */
  async goToConstitutionPage() : Promise<void> {
    this.page!.goto('https://lawphil.net/consti/cons1987.html');
    await this.page!.waitForLoadState('networkidle');
  }

  /**
   * Get the contents of the 1987 Constitution
   * @returns {Promise<string>} The text content of the Constitution
   */
  async getConstitutionContents() : Promise<string> {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const constitutionPath = path.join(__dirname, 'constitution.md');
      const content = fs.readFileSync(constitutionPath, 'utf8');
      logger.debug(content)
      return content;
    } catch (error) {
      console.error('Error reading constitution file:', error);
      return '';
    }
  }
}
