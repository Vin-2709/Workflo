import express from 'express';
import { getAdminProfile, assignTask, getAdminTasks } from '../controllers/admin.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';
import { Uploadmulter } from '../middlewares/multer.js';

const router = express.Router();

router.get('/gettask/:id', isLogged, getAdminTasks);
router.post('/:id/assigntask', isLogged, Uploadmulter.array("files", 5), assignTask);
router.get('/:id', isLogged, getAdminProfile);


export default router;