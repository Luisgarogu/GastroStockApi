import { Router } from 'express';
import {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

router.get('/',    getProducts);
router.get('/:id(\\d+)', getProduct);
router.post('/',   createProduct);
router.put('/:id(\\d+)', updateProduct);
router.delete('/:id(\\d+)', deleteProduct);

export default router;
