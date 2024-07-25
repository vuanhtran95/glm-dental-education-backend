import { Router } from 'express';
import { generateScenario } from '../controllers/scenarioController';
import { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

router.post('/generate', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => generateScenario(req, res))
);

export default router;
