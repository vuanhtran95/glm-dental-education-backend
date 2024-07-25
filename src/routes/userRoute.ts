import { Router } from 'express';
import { userGet } from '../controllers/userController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.get('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => userGet(req, res))
);

export default router;
