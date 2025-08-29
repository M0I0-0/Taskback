import supabase from "../lib/supabase.js";

export const getSchedule = async (req, res) => {
  const userId = req.user.id; // viene de requireAuth

  const { data, error } = await supabase
    .from("horario")
    .select(`
      id,
      dia,
      horas(rango),
      materias(nombre)
    `)
    .eq("user_id", userId);  // <-- filtro por usuario

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const assignClass = async (req, res) => {
  const { dia, hora_id, materia_id } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("horario")
    .insert([{ dia, hora_id, materia_id, user_id: userId }]) // guardar con user_id
    .select(`
      id,
      dia,
      horas(rango),
      materias(nombre)
    `);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
