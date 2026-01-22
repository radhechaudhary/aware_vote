import { Router } from "express";

const router = Router();

import {allSearch, nameSearch, citySearch, distSearch, sampleSearch, getLeaderById, postComment} from '../controllers/leaders-search.controller.js'
router.post('/all-search', allSearch)

router.post('/name-search', nameSearch)

router.post('/city-search', citySearch)

router.post('/district-search', distSearch)

router.post('/get-sample-leaders', sampleSearch)

router.post('/get-leader-by-id', getLeaderById)

router.post('/post-comment', postComment)


export default router;