import { MCPResource, ResourceContent } from "mcp-framework";
import RepublicActService from "../libraries/playwright/repacts/repacts.service.js";

class RepublicActResource extends MCPResource {
  uri = "resource://republic-act-resource";
  name = "RepublicActResource";
  description = "RepublicActResource resource description";
  mimeType = "application/json";

  async read(): Promise<ResourceContent[]> {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify({ message: "Hello from RepublicActResource resource" }),
      },
    ];
  }

  async readSpecificRA(raNumber: string): Promise<ResourceContent[]> {
    const republicActServiceInstance = await RepublicActService.createInstance();
    const raContents = await republicActServiceInstance.fetchRepublicActContents(raNumber);

    return [
      {
        uri: `${this.uri}/${raNumber}`,
        mimeType: this.mimeType,
        text: JSON.stringify({ raNumber, title: `Republic Act ${raNumber}`, contents: raContents }),
      },
    ];
  }
}

export default RepublicActResource;