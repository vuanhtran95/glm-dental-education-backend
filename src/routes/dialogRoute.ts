import { Router } from 'express';
import { dialogCreate, dialogGet } from '../controllers/dialogController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => dialogCreate(req, res))
);
router.get('/:id', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => dialogGet(req, res))
);

export default router;
