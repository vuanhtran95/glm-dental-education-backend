import { Router } from 'express';
import {
  dialogCreate,
  dialogGetDetail,
  dialogGetList,
} from '../controllers/dialogController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => dialogCreate(req, res))
);
router.get('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => dialogGetList(req, res))
);

router.get('/:id', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => dialogGetDetail(req, res))
);

export default router;
