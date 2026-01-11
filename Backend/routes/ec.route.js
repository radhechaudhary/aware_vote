import { Router } from "express";


const router = Router();

import {login, validate} from '../controllers/ec.controller.js'

router.post('/login', login)

router.post('/validate', validate)





export default router;