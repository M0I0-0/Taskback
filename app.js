import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import hoursRoutes from "./src/routes/hours.routes.js";
import subjectsRoutes from "./src/routes/subjects.routes.js";
import scheduleRoutes from "./src/routes/schedule.routes.js";
import notes from "./src/routes/notes.routes.js";
import eventos from "./src/routes/eventos.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/horas", hoursRoutes);
app.use("/materias", subjectsRoutes);
app.use("/horario", scheduleRoutes);
app.use("/notes", notes);
app.use("/eventos", eventos);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

export default app;
