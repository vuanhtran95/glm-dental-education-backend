import { Router } from 'express';
import {
  messageCreate,
  messageFeedback,
} from '../controllers/messageController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => messageCreate(req, res))
);

router.post('/:id/feedback', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => messageFeedback(req, res))
);

export default router;
