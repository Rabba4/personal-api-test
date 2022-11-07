import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [req.params.username]
    );
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }

  if (rows.length <= 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }

  res.json(rows[0]);
};

export const createUsuario = async (req, res) => {
  const { username, password, nombre, email, is_admin, fecha_baja } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO usuarios (username, password, nombre, email, is_admin) VALUES (?, ?, ?, ?, ?)",
      [username, password, nombre, email, is_admin]
    );
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }

  res.send({
    id: rows.insertId,
    username,
    nombre,
    email,
    is_admin,
  });
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }

  if (result.affectedRows <= 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });

  res.sendStatus(204);
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, is_admin, fecha_baja } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), is_admin = IFNULL(?, is_admin), fecha_baja = IFNULL(?, fecha_baja) WHERE id = ?",
      [nombre, email, is_admin, fecha_baja, id]
    );
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });

  const [rows] = await pool.query(
    "SELECT id, username, nombre, email, fecha_alta, is_admin, fecha_baja FROM usuarios WHERE id = ?",
    [id]
  );

  res.json(rows[0]);
};
