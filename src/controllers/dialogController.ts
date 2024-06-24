import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import Dialog from '../models/dialog';
import { Message, Scenario } from '../models';
import { EMessageRole } from '../types/message';
import { buildDialogContext } from '../utils';
import { IScenario } from '../types/scenario';

export const dialogCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { createdUserId, scenarioId, name } = req.body;

  try {
    const dialog = new Dialog({
      createdUserId,
      scenarioId,
      name,
    });

    const savedDialog = await dialog.save();

    // Create context for dialog based on scenario

    const scenario: IScenario | null = await Scenario.findById(scenarioId);
    const systemContextMessage = new Message({
      role: EMessageRole.SYSTEM,
      content: buildDialogContext(scenario as IScenario),
      dialogId: savedDialog._id,
    });
    await systemContextMessage.save();

    res.status(201).json(savedDialog);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogGetList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id: userId } = req.query;
  if (!userId) res.status(400).json({ error: 'Id not found' });

  try {
    const dialogs = await Dialog.find({ createdUserId: userId })
      .sort({ updatedAt: 'desc' })
      .populate('scenarioId')
      .exec();
    res.status(200).json({ dialogs });
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogGetDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: 'Id not found' });

  try {
    const dialog = await Dialog.findById(id);
    const scenario = await Scenario.findById(dialog?.scenarioId);
    const messages = await Message.find({ dialogId: id });
    res.status(200).json({ detail: { dialog, messages, scenario } });
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
