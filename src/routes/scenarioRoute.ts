import { Router } from 'express';
import {
  generateScenario,
  scenarioCreate,
  scenarioGetDetail,
  scenarioGetList,
} from '../controllers/scenarioController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => scenarioCreate(req, res))
);

router.get('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => scenarioGetList(req, res))
);

router.get('/:id', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => scenarioGetDetail(req, res))
);

router.post('/generate', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => generateScenario(req, res))
);

export default router;
