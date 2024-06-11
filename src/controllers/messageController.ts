import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Message } from '../models';

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
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
