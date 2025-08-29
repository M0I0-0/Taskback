import supabase from "../lib/supabase.js";

export const getSubjects = async (req, res) => {
  const { data, error } = await supabase.from("materias").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createSubject = async (req, res) => {
  const { nombre } = req.body;
  const { data, error } = await supabase.from("materias").insert([{ nombre }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
