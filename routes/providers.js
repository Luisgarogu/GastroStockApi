import { Router } from 'express';
import {
  getProviders, getProvider, createProvider, updateProvider, deleteProvider
} from '../controllers/providers.controller.js';

const router = Router();

router.get('/',          getProviders);
router.get('/:id(\\d+)', getProvider);
router.post('/',         createProvider);
router.put('/:id(\\d+)', updateProvider);
router.delete('/:id(\\d+)', deleteProvider);

export default router;
