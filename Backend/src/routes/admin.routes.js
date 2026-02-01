import express from 'express';
import { getAdminProfile, assignTask, getAdminTasks } from '../controllers/admin.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';
import { Uploadmulter } from '../middlewares/multer.js';

const router = express.Router();

router.get('/gettask/:id', getAdminTasks);
router.post('/:id/assigntask', Uploadmulter.array("files", 5), assignTask);
router.get('/:id', getAdminProfile);


export default router;
