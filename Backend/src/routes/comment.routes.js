import express from 'express';
import { addAdminComment, addEmployeeComment } from '../controllers/comment.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/admin-comment/:taskId', isLogged, addAdminComment);
router.post('/employee-comment/:taskId', isLogged, addEmployeeComment);

export default router;