import { Router } from "express";


const router = Router();

import {login} from '../controllers/ec.controller.js'

router.post('/login', login)





export default router;