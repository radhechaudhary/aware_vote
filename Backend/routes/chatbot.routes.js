import { Router } from "express"
const router = Router();
import { query } from "../controllers/chatbot.controller.js"

router.post("/query", query());

export default router;