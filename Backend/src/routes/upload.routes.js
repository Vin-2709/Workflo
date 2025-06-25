import express from 'express';
import { adminUpload, employeeUpload } from '../controllers/upload.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';
import { Uploadmulter } from '../middlewares/multer.js';

const router = express.Router();

router.post("/admin-upload/:taskId", isLogged, Uploadmulter.array("files", 5), adminUpload);
router.post("/employee-upload/:taskId", isLogged, Uploadmulter.array("files", 5), employeeUpload);

export default router;