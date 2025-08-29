import { Router } from "express";
import { assignClass, getSchedule } from "../controllers/schedule.controller.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get("/", requireAuth, getSchedule);
router.post("/", requireAuth, assignClass);

export default router;
