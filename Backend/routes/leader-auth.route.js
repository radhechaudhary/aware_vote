import { Router } from "express";

const router = Router();

import {login, verification, validate} from '../controllers/leader-auth.controller.js'

router.post('/login', login)

import { uploadVerificationFiles } from "../middelwares/multer.middleware.js";
router.post('/verification', uploadVerificationFiles.array("documents", 6), verification)

router.post('/validate', validate)

export default router;