import { Router } from 'express';
import { dialogCreate, dialogGet } from '../controllers/dialogController';

const router = Router();

router.post('/', dialogCreate);
router.get('/:id', dialogGet);

export default router;
