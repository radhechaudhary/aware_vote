import { Router } from "express";

const router = Router();

import {allSearch, nameSearch, citySearch, distSearch} from '../controllers/leaders-search.controller.js'
router.post('/all-search', allSearch)

router.post('/name-search', nameSearch)

router.post('/city-search', citySearch)

router.post('/district-search', distSearch)


export default router;