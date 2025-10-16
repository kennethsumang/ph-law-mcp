import { MCPTool } from "mcp-framework";
import { z } from "zod";
import RepublicActResource from "../resources/RepublicActResource.js";

interface GetRepublicActContentsToolInput {
  message: string;
}

class GetRepublicActContentsTool extends MCPTool<GetRepublicActContentsToolInput> {
  name = "get-republic-act-contents-tool";
  description = "This will get the contents of the specified Republic Act.";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
    },
  };

  async execute(input: GetRepublicActContentsToolInput) {
    const republicActResource = new RepublicActResource();
    const raNumberMatch = RegExp(/(\d{4,5})/).exec(input.message);
    if (raNumberMatch) {
      const raNumber = raNumberMatch[1];
      const contents = await republicActResource.readSpecificRA(raNumber);
      return contents[0].text;
    }
    return "Invalid Republic Act number.";
  }
}

export default GetRepublicActContentsTool;