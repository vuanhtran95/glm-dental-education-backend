import { Router } from 'express';
import { userCreate, userGet } from '../controllers/userController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.get('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => userGet(req, res))
);

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => userCreate(req, res))
);

export default router;
