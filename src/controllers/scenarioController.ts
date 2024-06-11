import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { MongoServerError } from 'mongodb';
import Scenario from '../models/scenario';

export const scenarioCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientName, age, symptoms, createdUserId } = req.body;

  try {
    const scenario = new Scenario({
      patientName,
      age,
      symptoms,
      createdUserId,
    });

    const savedScenario = await scenario.save();
    res.status(201).json(savedScenario);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const scenarioGet = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: 'Id not found' });

  try {
    const scenario = await Scenario.findById(id);
    console.log(scenario, 'scenario');

    res.status(200).json(scenario);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
