import { Request, Response } from "express";
import { Message } from "../models";
import { ERROR_RESPONSE } from "../constants";
import { EMessageRole, LlamaMessage } from "../types/message";
import { callHfLlama3 } from "../utils/huggingFace";
import { removeTextInsideAsterisks } from "../utils";

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, dialogId } = req.body;

  const messages = await Message.find({ dialogId });

  const assistantMessage = await callToLlama(message.content, messages);

  const payload = [
    {
      role: EMessageRole.USER,
      content: message.content,
      uri: message.uri,
      dialogId,
    },
    {
      role: EMessageRole.ASSISTANT,
      content: assistantMessage,
      dialogId,
    },
  ];

  try {
    const message = await Message.insertMany(payload);

    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};

export const messageFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "Id not found" });

  const { feedback } = req.body;

  try {
    const message = await Message.findOneAndUpdate({ _id: id }, { feedback });

    if (!message) {
      res.status(404).send("Message not found");
      return;
    }

    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};

export const callToLlama = async (
  question: string,
  history: LlamaMessage[],
  maxToken: number = 48
) => {
  try {
    const res = await callHfLlama3(
      [...history, { role: EMessageRole.USER, content: question }],
      64
    );

    console.log(res);
    return removeTextInsideAsterisks(res[0].content || "");
  } catch (err) {
    console.log(err, "error");
  }
};
