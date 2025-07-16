import { Router } from 'express';
import { suggestMeal } from '../controllers/ai.controller.js';

const router = Router();
router.post('/suggest-meal', suggestMeal);

export default router;
