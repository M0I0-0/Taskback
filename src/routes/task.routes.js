import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get("/", requireAuth, getTasks);
router.post("/", requireAuth, createTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;