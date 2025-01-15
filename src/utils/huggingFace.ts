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
  });

  return chat.choices.map((e) => e.message);
};
