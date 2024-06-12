import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { ERROR_RESPONSE } from '../constants';

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json(ERROR_RESPONSE.INVALID_TOKEN);
  }

  const token = authorizationHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json(ERROR_RESPONSE.TOKEN_NOT_FOUND);
  }

  try {
    jwt.verify(token, env.jwtSecret || '');
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json(ERROR_RESPONSE.INVALID_TOKEN);
  }
};
