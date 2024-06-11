import { Router } from 'express';
import { messageCreate } from '../controllers/messageController';

const router = Router();

router.post('/', messageCreate);

export default router;
