// controllers/notes.controller.js

import supabase from "../lib/supabase.js";

export const getNotes = async (req, res) => {
  const userId = req.user.id; // viene del requireAuth

  const { data, error } = await supabase
    .from("notas")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0] || { contenido: "" });
};

export const saveNotes = async (req, res) => {
  const { contenido } = req.body;
  const userId = req.user.id;

  // Buscar si ya existe nota de este usuario
  const { data: existing, error: errorExisting } = await supabase
    .from("notas")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  if (errorExisting) return res.status(400).json({ error: errorExisting.message });

  if (existing.length > 0) {
    // Actualizar
    const { data, error } = await supabase
      .from("notas")
      .update({ contenido, updated_at: new Date() })
      .eq("id", existing[0].id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } else {
    // Insertar nueva
    const { data, error } = await supabase
      .from("notas")
      .insert([{ contenido, user_id: userId }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  }
};
