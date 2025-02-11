import { HfInference } from "@huggingface/inference";
import env from "../config/env";
import { LlamaMessage } from "../types/message";

const client = new HfInference(env.hfToken);

export const callHfLlama3 = async function (
  messages: LlamaMessage[],
  maxToken: number
): Promise<LlamaMessage[]> {
  const chat = await client.chatCompletion({
    model: env.hfModel,
    messages,
    max_tokens: maxToken,
    provider: "hf-inference",
  });

  return chat.choices.map((e) => e.message);
};

const MAX_MODEL_TOKENS = 4096; // Adjust based on the model you use

export const estimateTokens = (text: string) => {
  return Math.ceil(text.split(/\s+/).length * 1.3); // Approximate token count
};

export const getMaxTokens = (userInput: string) => {
  const inputTokens = estimateTokens(userInput);
  return inputTokens * 3; // Buffer to avoid overflow
};
