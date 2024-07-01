import { Request, Response } from 'express';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';
import { EMessageRole, IMessage, LlamaMessage } from '../types/message';
import axios from 'axios';
import env from '../config/env';
import { removeTextInsideAsterisks } from '../utils';
import { runPolly } from '../services/polly';
import pollyClient from '../services/polly/polly-client';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { messages, dialogId } = req.body;

  let uri = [];

  uri[0] = await runPolly(messages[0].content);
  uri[1] = await runPolly(messages[1].content);

  const payload = await messages.map((message: LlamaMessage, key: number) => {
    return {
      role: message.role,
      content: message.content,
      dialogId,
      uri: uri[key],
    };
  });

  try {
    await Message.insertMany(payload);

    res.status(201).json({});
  } catch (err) {
    console.log(err, 'err');

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
