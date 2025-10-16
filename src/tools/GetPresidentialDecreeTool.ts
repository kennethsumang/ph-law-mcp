import { logger, MCPTool } from "mcp-framework";
import { z } from "zod";
import PresidentialDecreeResource from "../resources/PresidentialDecreeResource.js";

interface GetPresidentialDecreeInput {
  message: string;
}

class GetPresidentialDecreeTool extends MCPTool<GetPresidentialDecreeInput> {
  name = "get-presidential-decree";
  description = "This tool searches for Presidential Decrees based on a provided keyword.";

  schema = {
    message: {
      type: z.string(),
      description: "Keyword to search for in Presidential Decrees (e.g., 'education', 'healthcare')",
    },
  };

  async execute(input: GetPresidentialDecreeInput) {
    const presidentialDecreeResource = new PresidentialDecreeResource();
    const choices = await presidentialDecreeResource.searchForKeyword(input.message);
    logger.info(`Presidential Decree search results: ${JSON.stringify(choices)}`);
    return `Processed: ${JSON.stringify(choices)}`;
  }
}

export default GetPresidentialDecreeTool;