import { Router } from "express";
import{CreteHour, getHours} from "../controllers/hours.controller.js";

const router = Router();

router.get("/", getHours);
router.post("/", CreteHour);
export default router;