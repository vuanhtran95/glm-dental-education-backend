import { Request, Response } from 'express';
import User from '../models/user';
import { MongoServerError } from 'mongodb';

export const userCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { credentialId, role, fullName } = req.body;

  try {
    const newUser = new User({ credentialId, role, fullName });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};
