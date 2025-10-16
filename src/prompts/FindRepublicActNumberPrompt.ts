import { MCPPrompt } from "mcp-framework";
import { z } from "zod";

interface FindRepublicActNumberPromptInput {
  message: string;
}

class FindRepublicActNumberPrompt extends MCPPrompt<FindRepublicActNumberPromptInput> {
  name = "find-republic-act-number-prompt";
  description = "FindRepublicActNumberPrompt prompt description";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
      required: true,
    },
  };

  async generateMessages({ message }: FindRepublicActNumberPromptInput) {
    return [
      {
        role: "system",
        content: {
          type: "text",
          text: "You are a helpful assistant that searches the Web for Republic Act numbers based on user queries. Please only respond with the RA number if found, otherwise respond with 'Not Found'.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `I want to find the Republic Act number for the following query: "${message}". Please provide only the RA number or 'Not Found' if it doesn't exist.`,
        },
      },
    ];
  }
}

export default FindRepublicActNumberPrompt;