import { MCPResource, ResourceContent } from "mcp-framework";
import ConstitutionService from "../libraries/playwright/constitution/constitution.service.js";

class ConstitutionResource extends MCPResource {
  uri = "resource://constitution";
  name = "Constitution";
  description = "Constitution resource description";
  mimeType = "application/json";

  async read(): Promise<ResourceContent[]> {
    const constitutionServiceInstance = await ConstitutionService.createInstance();
    const contents = await constitutionServiceInstance.fetchRepublicActContents();
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify({ title: "1987 Constitution of the Republic of the Philippines", contents }),
      },
    ];
  }
}

export default ConstitutionResource;