import { Router } from 'express';
import {
  getRoles
} from '../controllers/rol.controller.js';

const router = Router();
router.get('/', getRoles);

export default router;
