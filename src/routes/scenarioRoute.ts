import { Router } from 'express';
import { scenarioCreate, scenarioGet } from '../controllers/scenarioController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => scenarioCreate(req, res))
);

router.get('/:id', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => scenarioGet(req, res))
);

export default router;
