import { pool } from '../lib/db.js';

/* GET /api/users  ─────────────────────────────── */
export const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id');
  res.json(rows);
};

export const getRoles = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM roles');
  res.json(rows);
};

/* GET /api/users/:id ──────────────────────────── */
export const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE id=$1', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Usuario no encontrado' });
};

/* POST /api/users ─────────────────────────────── */
export const createUser = async (req, res) => {
  const { nombre, correo, contraseña, rol_id } = req.body;
  const text = `INSERT INTO usuarios(nombre, correo, contraseña, rol_id)
                VALUES($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(text, [nombre, correo, contraseña, rol_id]);
  res.status(201).json(rows[0]);
};

/* PUT /api/users/:id ──────────────────────────── */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña, rol_id } = req.body;
  const text = `UPDATE usuarios
                SET nombre=$1, correo=$2, contraseña=$3, rol_id=$4
                WHERE id=$5 RETURNING *`;
  const { rows } = await pool.query(text, [nombre, correo, contraseña, rol_id, id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Usuario no encontrado' });
};

/* DELETE /api/users/:id ───────────────────────── */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
  res.sendStatus(204);
};
