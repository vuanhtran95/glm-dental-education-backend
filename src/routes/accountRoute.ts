import { Router } from 'express';
import {
  accountLogin,
  accountRegister,
} from '../controllers/accountController';

const router = Router();

router.post('/register', accountRegister);
router.post('/login', accountLogin);

export default router;
