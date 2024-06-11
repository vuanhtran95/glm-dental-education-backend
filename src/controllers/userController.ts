import { Request, Response } from 'express';
import User from '../models/user';
import { MongoServerError } from 'mongodb';
import Account from '../models/account';
import env from '../config/env';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { accountId, role, fullName } = req.body;

  // Check if accountId is existed
  try {
    await Account.findById(accountId);
  } catch (err) {
    const error = err as MongoServerError;
    console.log(error);

    res.status(400).json({ error: 'Account Id is invalid' });
    return;
  }

  // TODO: Check if account is associated to another user?

  // Create user link to account
  try {
    const newUser = new User({ accountId, role, fullName });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const userGet = async (req: Request, res: Response): Promise<void> => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization;
    jwt.verify(authorization, env.jwtSecret, async (err, decoded) => {
      if (err && !decoded) {
        return res.sendStatus(403);
      }

      const decodedData = decoded as JwtPayload;

      try {
        const user = await User.findOne({
          accountId: decodedData?._id as string,
        });
        if (!user) {
          return res.sendStatus(404);
        }
        res.status(200).json(user);
      } catch (error) {
        res
          .status(500)
          .json({ error: 'An error occurred while retrieving the user' });
      }
    });
    return;
  }
  res.send(500);
};
