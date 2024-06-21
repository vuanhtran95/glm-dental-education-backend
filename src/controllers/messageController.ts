import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content, dialogId } = req.body;

  try {
    const newMessage = new Message({
      content,
      dialogId,
    });

    const message = await newMessage.save();
    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};
