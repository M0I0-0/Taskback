import { Router } from "express";
import { getNotes, saveNotes} from "../controllers/notes.controller.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get("/", requireAuth, getNotes);
router.post("/", requireAuth, saveNotes);

export default router;