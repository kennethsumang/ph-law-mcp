import { logger, MCPResource, ResourceContent } from "mcp-framework";
import PresidentialDecreeService from "../libraries/playwright/presidential-decrees/presidential-decree.service.js";

class PresidentialDecreeResource extends MCPResource {
  uri = "resource://presidential-decree";
  name = "PresidentialDecree";
  description = "PresidentialDecree resource description";
  mimeType = "application/json";

  async read(): Promise<ResourceContent[]> {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify({ message: "Hello from PresidentialDecree resource" }),
      },
    ];
  }

  async searchForKeyword(keyword: string): Promise<ResourceContent[]> {
    const presidentialDecreeServiceInstance = await PresidentialDecreeService.createInstance();
    const options = await presidentialDecreeServiceInstance.searchForDecreeKeyword(keyword);
    logger.info(`Presidential Decree search results: ${JSON.stringify(options)}`);
    return options.map((option) => {
      return {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(option),
      };
    });
  }
}

export default PresidentialDecreeResource;