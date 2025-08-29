import supabase from "../lib/supabase.js";

// 📌 Crear tarea
export const createTask = async (req, res) => {
  const { nombre, fecha, profesor, materia } = req.body;

  const { data, error } = await supabase
    .from("tareas")
    .insert([{ 
      user_id: req.user.id, // 🔑 asignamos el usuario que está logueado
      nombre, 
      fecha, 
      profesor, 
      materia 
    }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

// 📌 Obtener todas las tareas SOLO del usuario
export const getTasks = async (req, res) => {
  const { data, error } = await supabase
    .from("tareas")
    .select("*")
    .eq("user_id", req.user.id); // 🔑 solo tareas del usuario

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// 📌 Actualizar tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, profesor, materia } = req.body;

  const { data, error } = await supabase
    .from("tareas")
    .update({ nombre, fecha, profesor, materia })
    .eq("id", id)
    .eq("user_id", req.user.id) // 🔑 solo si es su tarea
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

// 📌 Eliminar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tareas")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id); // 🔑 solo si es su tarea

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Tarea eliminada" });
};
