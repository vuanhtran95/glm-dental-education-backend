import { Request, Response } from 'express';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';
import { EMessageRole, LlamaMessage } from '../types/message';
import axios from 'axios';
import env from '../config/env';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, dialogId } = req.body;

  // const messages = await Message.find({ dialogId });

  // const assistantMessage = await callToLlama2(message.content, messages);

  const assistantMessage = 'Good'

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
  if (!id) res.status(400).json({ error: 'Id not found' });

  const { feedback } = req.body;

  try {
    const message = await Message.findOneAndUpdate({ _id: id }, { feedback });

    if (!message) {
      res.status(404).send('Message not found');
      return;
    }

    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};

export const callToLlama2 = async (
  question: string,
  history: LlamaMessage[]
) => {
  try {
    const response = await axios.post(
      env.llamaApi,
      {
        inputs: buildMessage(question, history).replace(/\n/g, ''),
        parameters: {
          max_new_tokens: 48,
          top_p: 0.9,
          temperature: 0.6,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const rawResponse = response.data.split('<|end_header_id|>');
    return rawResponse[rawResponse.length - 1].replace(/\n/g, '');
  } catch (err) {
    console.log(err, 'error');
  }
};

export const buildMessage = (question: string, history: LlamaMessage[]) => {
  return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${
    history[0].content
  }
  ${history
    .filter((message) => message.role === EMessageRole.SYSTEM)
    .map((message) =>
      message.role === EMessageRole.USER
        ? `<|eot_id|><|start_header_id|>user<|end_header_id|>${message.content}`
        : `<|eot_id|><|start_header_id|>assistant<|end_header_id|>${message.content}`
    )}<|eot_id|><|start_header_id|>user<|end_header_id|>${question}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;
};
