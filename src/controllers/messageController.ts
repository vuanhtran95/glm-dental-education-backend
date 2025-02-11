import { Request, Response } from "express";
import { Dialog, Message, Scenario } from "../models";
import { ERROR_RESPONSE, verbosityLevelMapping } from "../constants";
import { EMessageRole, LlamaMessage } from "../types/message";
import { callHfLlama3, getMaxTokens } from "../utils/huggingFace";
import {
  removeIncompleteLastSentence,
  removeTextInsideAsterisks,
} from "../utils";
import env from "../config/env";

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, dialogId }: { message: any; dialogId: string } = req.body;

  const messages = await Message.find({ dialogId });

  const dialog = await Dialog.findById(dialogId);

  const scenario = await Scenario.findById(dialog?.scenarioId);

  const maxToken = getMaxTokens(message.content);

  const assistantMessage = await callToLlama(
    message.content,
    messages,
    Math.min(verbosityLevelMapping[scenario?.verbosityLevel || 1], maxToken)
  );

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
    console.log(err, "err");

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
      env.hfModelChat,
      [...history, { role: EMessageRole.USER, content: question }],
      maxToken
    );

    return removeIncompleteLastSentence(
      removeTextInsideAsterisks(res[0].content || "")
    );
  } catch (err) {
    console.log(err, "error");
  }
};
