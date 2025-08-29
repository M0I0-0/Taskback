import { Router } from "express";
import { getEventos, createEvento, deleteEvento} from "../controllers/eventos.controller.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get("/", requireAuth, getEventos);
router.post("/", requireAuth, createEvento);
router.delete("/:id", requireAuth, deleteEvento);

export default router;