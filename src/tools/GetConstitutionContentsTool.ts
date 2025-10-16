import { MCPTool } from "mcp-framework";
import ConstitutionResource from "../resources/ConstitutionResource.js";


class GetConstitutionContentsTool extends MCPTool {
  name = "get-constitution-contents";
  description = "This tool retrieves the contents of the 1987 Constitution of the Philippines.";

  schema = {};

  async execute() {
    const constitutionResource = new ConstitutionResource();
    const contents = await constitutionResource.read();
    return contents[0].text;
  }
}

export default GetConstitutionContentsTool;