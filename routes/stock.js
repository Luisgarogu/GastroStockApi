import { Router } from 'express';
import {
  getStockMoves, createStockMove, deleteStockMove
} from '../controllers/stock.controller.js';

const router = Router();

router.get('/',   getStockMoves);           // listar / filtrar
router.post('/',  createStockMove);         // nueva entrada / salida
router.delete('/:id', deleteStockMove);

export default router;
