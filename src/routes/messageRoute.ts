import { Router } from 'express';
import { messageCreate } from '../controllers/messageController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => messageCreate(req, res))
);

export default router;
