import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import Dialog from '../models/dialog';
import { Message } from '../models';

export const dialogCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { createdUserId, scenarioId } = req.body;

  try {
    const dialog = new Dialog({
      createdUserId,
      scenarioId,
    });

    const savedDialog = await dialog.save();
    res.status(201).json(savedDialog);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogGet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: 'Id not found' });

  try {
    const dialog = await Dialog.findById(id);
    const messages = await Message.find({ dialogId: id });
    res.status(200).json({ dialog, messages });
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
