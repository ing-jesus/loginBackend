import { Router } from 'express';
import UsersController from '../controllers/usersController.js';

const router = Router();

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.get('/', UsersController.getAll);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;

