import supabase from "../lib/supabase.js";

// 📌 Obtener eventos solo del usuario
export const getEventos = async (req, res) => {
  const userId = req.user.id; // viene de requireAuth

  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// 📌 Crear un nuevo evento
export const createEvento = async (req, res) => {
  try {
    const { titulo, fecha_inicio } = req.body;
    const userId = req.user.id; // usar el id del usuario autenticado

    if (!titulo || !fecha_inicio) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const { data, error } = await supabase
      .from("eventos")
      .insert([{ titulo, fecha_inicio, user_id: userId }])
      .select()
      .single(); // devuelve solo un objeto

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Eliminar un evento (solo si pertenece al usuario)
export const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // usar el id del usuario autenticado

    if (!id) {
      return res.status(400).json({ error: "Falta el id del evento" });
    }

    const { data, error } = await supabase
      .from("eventos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No se encontró el evento o no pertenece al usuario" });
    }

    res.json({ message: "Evento eliminado correctamente", deleted: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
