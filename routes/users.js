import { Router } from 'express';
import {
  getUsers, getUser, createUser, updateUser, deleteUser, getRoles
} from '../controllers/users.controller.js';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
