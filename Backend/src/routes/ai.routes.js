import express from 'express';
import { askAI } from '../controllers/ai.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:id/askai', isLogged, askAI);

export default router;