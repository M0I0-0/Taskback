import express from 'express';
import cors from 'cors';
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import hoursRoutes from "./src/routes/hours.routes.js";
import subjectsRoutes from "./src/routes/subjects.routes.js";
import scheduleRoutes from "./src/routes/schedule.routes.js";
import notes from "./src/routes/notes.routes.js";
import eventos from "./src/routes/eventos.routes.js";

import dotenv from 'dotenv';
import e from 'express';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use("/api/horas", hoursRoutes);
app.use("/api/materias", subjectsRoutes);
app.use("/api/horario", scheduleRoutes);
app.use("/api/notes", notes);
app.use("/api/eventos", eventos);
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
export default app;