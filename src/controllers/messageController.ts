import { Request, Response } from 'express';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';
import { EMessageRole, IMessage, LlamaMessage } from '../types/message';
import axios from 'axios';
import env from '../config/env';
import { removeTextInsideAsterisks } from '../utils';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { messages, dialogId } = req.body;

  try {
    await Message.insertMany(
      messages.map((message: LlamaMessage) => ({
        role: message.role,
        content: message.content,
        dialogId,
      }))
    );

    res.status(201).json({});
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};

export const callToLlama2 = async (messages: LlamaMessage[]) => {
  try {
    const response = await axios.post(
      `${env.llamaApi}process_message`,
      {
        history: messages,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    return removeTextInsideAsterisks(response.data as string);
  } catch (err) {
    console.log(err, 'errrrrrrr');
  }
};
