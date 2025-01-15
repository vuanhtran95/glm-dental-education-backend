import { Request, Response } from "express";
import { MongoServerError, ObjectId } from "mongodb";
import Dialog from "../models/dialog";
import { Message, Scenario, User } from "../models";
import { EMessageRole } from "../types/message";
import { buildDialogContext } from "../utils";
import { IScenario } from "../types/scenario";

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

    // Create context for dialog based on scenario
    const scenario: IScenario | null = await Scenario.findById(scenarioId);
    if (!scenario) {
      res.status(404);
      return;
    }

    const systemContextMessage = new Message({
      role: EMessageRole.SYSTEM,
      content: buildDialogContext(scenario),
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
  const { userId } = req.query;

  const id = userId as string;

  try {
    const dialogs = await Dialog.aggregate([
      {
        $match: userId
          ? { createdUserId: userId ? new ObjectId(id) : "" }
          : { isSubmitted: true },
      },
      {
        $lookup: {
          from: "scenarios",
          localField: "scenarioId",
          foreignField: "_id",
          as: "scenario",
        },
      },
      {
        $unwind: "$scenario",
      },
      {
        $lookup: {
          from: "users",
          localField: "createdUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      { $sort: { createdAt: -1 } },
    ]);
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
  if (!id) res.status(400).json({ error: "Id not found" });

  try {
    const dialog = await Dialog.findById(id);
    const scenario = await Scenario.findById(dialog?.scenarioId);
    const messages = await Message.find({ dialogId: id });
    const user = await User.findById(dialog?.createdUserId);
    res.status(200).json({ detail: { dialog, messages, scenario, user } });
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogEnd = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) res.status(400).json({ error: "Id not found" });

  try {
    const dialog = await Dialog.findOneAndUpdate(
      { _id: id },
      { isEnded: true }
    );

    if (!dialog) {
      res.status(404).send("Dialog not found");
      return;
    }

    res.status(201).json({});
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogSubmit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "Id not found" });

  try {
    const dialog = await Dialog.findOneAndUpdate(
      { _id: id },
      { isSubmitted: true }
    );

    if (!dialog) {
      res.status(404).send("Dialog not found");
      return;
    }

    res.status(201).json({});
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const dialogFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "Id not found" });

  const { feedback } = req.body;

  try {
    const dialog = await Dialog.findOneAndUpdate({ _id: id }, { feedback });

    if (!dialog) {
      res.status(404).send("Dialog not found");
      return;
    }

    res.status(201).json({});
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
