import supabase from "../lib/supabase.js";

// 📌 Registrar usuario con username
export const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // 1. Crear usuario en Auth (requiere service_role key)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ se crea sin verificar correo
    });

    if (error) return res.status(400).json({ error: error.message });

    // 2. Insertar en la tabla perfiles
    const { error: perfilError } = await supabase.from("perfiles").insert([
      { id: data.user.id, username }
    ]);

    if (perfilError) return res.status(400).json({ error: perfilError.message });

    res.json({ user: data.user, message: "Usuario registrado con éxito 🚀" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 📌 Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ user: data.user, session: data.session });
};
