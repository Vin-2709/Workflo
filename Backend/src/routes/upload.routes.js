import express from 'express';
import { isLogged } from '../middlewares/auth.middleware.js';
import { Uploadmulter } from '../middlewares/multer.js';
import { adminUpload, employeeUpload, deleteFile } from '../controllers/upload.controller.js';


const router = express.Router();

router.delete("/delete-file/:taskId", isLogged, deleteFile);
router.post("/admin-upload/:taskId", isLogged, Uploadmulter.array("files", 5), adminUpload);
router.post("/employee-upload/:taskId", isLogged, Uploadmulter.array("files", 5), employeeUpload);

export default router;
