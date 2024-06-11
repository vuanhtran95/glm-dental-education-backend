import { Router } from 'express';
import { scenarioCreate, scenarioGet } from '../controllers/scenarioController';

const router = Router();

router.post('/', scenarioCreate);
router.get('/:id', scenarioGet);

export default router;
