import express from 'express';
import { 
    updateTaskStatus, 
    getTaskById, 
    deleteTask, 
    editTask, 
    getTaskWithComments 
} from '../controllers/task.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/taskstatusupdate/:id', isLogged, updateTaskStatus);
router.get('/task/:id', isLogged, getTaskById);
router.get('/delete/:id', isLogged, deleteTask);
router.put('/edit-task/:id', isLogged, editTask);
router.get('/with-comments/:taskId', isLogged, getTaskWithComments);

export default router;