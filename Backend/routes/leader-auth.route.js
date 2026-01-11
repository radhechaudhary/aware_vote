import { Router } from "express";

const router = Router();

import {login, signup, validate} from '../controllers/leader-auth.controller.js'

router.post('/login', login)

router.post('/signup', signup)

router.post('/validate', validate)

export default router;