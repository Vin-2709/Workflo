import express from 'express';
import { getEmployeeProfile, getEmployeeTasks } from '../controllers/employee.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:id', isLogged, getEmployeeProfile);
router.get('/gettask/:id', isLogged, getEmployeeTasks);

export default router;