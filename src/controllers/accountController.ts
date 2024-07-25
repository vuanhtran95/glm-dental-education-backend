import env from '../config/env';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Account from '../models/account';
import { MongoServerError } from 'mongodb';
import { User } from '../models';

/**
 * Register account: create account and user link to account
 * @param req
 * @param res
 */
export const accountRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password, role, fullName } = req.body;

  try {
    const newAccount = new Account({ username, password });
    await newAccount.save();

    const newUser = new User({ accountId: newAccount._id, role, fullName });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    const error = err as MongoServerError;
    console.log(error, 'error');
    res.status(400).json({ error: error.errmsg });
  }
};

export const accountLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    if (!account || !(await bcrypt.compare(password, account.password))) {
      res.status(401).send('Invalid login credentials');
      return;
    }

    const token = jwt.sign({ _id: account._id }, env.jwtSecret, {
      expiresIn: '24h',
    });
    res.send({ token });
    return;
  } catch (error) {
    console.log(error, 'error');

    res.status(401).send('Unauthorised');
  }
};
