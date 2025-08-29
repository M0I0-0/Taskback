
import supabase from "../lib/supabase.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    // Verificar usuario con el token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Guardar usuario en la request
    req.user = data.user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Authentication failed" });
  }
};
