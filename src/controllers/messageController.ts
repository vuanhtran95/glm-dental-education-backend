import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { role, content, dialogId } = req.body;

  try {
    const message = new Message({
      role,
      content,
      dialogId,
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};
