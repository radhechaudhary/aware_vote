import { Router } from "express";


const router = Router();

import {login, validate, submissions, createCommunity} from '../controllers/ec.controller.js'

router.post('/login', login)

router.post('/validate', validate)

router.post('/submissions', submissions)

router.post('/create-community', createCommunity)


export default router;