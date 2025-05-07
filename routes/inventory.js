import { Router } from 'express';
import {
  getInventory, getInventoryItem, createInventoryItem,
  updateInventoryItem, deleteInventoryItem
} from '../controllers/inventory.controller.js';

const router = Router();
router.get('/', getInventory);
router.get('/:id', getInventoryItem);
router.post('/', createInventoryItem);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);

export default router;
