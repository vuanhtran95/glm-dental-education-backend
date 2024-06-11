import env from '../config/env';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Account from '../models/account';
import { MongoServerError } from 'mongodb';

export const accountRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const newAccount = new Account({ username, password });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const accountLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    if (!account || !(await bcrypt.compare(password, account.password))) {
      return res.status(401).send('Invalid login credentials');
    }

    const token = jwt.sign({ _id: account._id }, env.jwtSecret, {
      expiresIn: '24h',
    });
    res.send({ token });
  } catch (error) {
    res.status(401).send('Unauthorised');
  }
};
