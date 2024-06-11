import { Router } from 'express';
import { userCreate, userGet } from '../controllers/userController';

const router = Router();

router.post('/', userCreate);
router.get('/', userGet);

export default router;
