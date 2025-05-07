import { pool } from '../lib/db.js';

/* GET /api/inventory ─────────────────────────── */
export const getInventory = async (_, res) => {
  const { rows } = await pool.query(
    `SELECT inv.*, p.nombre AS producto
     FROM inventario inv JOIN productos p ON p.id = inv.producto_id
     ORDER BY inv.id`
  );
  res.json(rows);
};

/* GET /api/inventory/:id ─────────────────────── */
export const getInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM inventario WHERE id=$1', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Item no encontrado' });
};

/* POST /api/inventory ────────────────────────── */
export const createInventoryItem = async (req, res) => {
  const { producto_id, cantidad_actual } = req.body;
  const text = `INSERT INTO inventario (producto_id, cantidad_actual)
                VALUES ($1,$2) RETURNING *`;
  const { rows } = await pool.query(text, [producto_id, cantidad_actual]);
  res.status(201).json(rows[0]);
};

/* PUT /api/inventory/:id ─────────────────────── */
export const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { cantidad_actual } = req.body;
  const text = `UPDATE inventario
                SET cantidad_actual=$1, fecha_actualizacion=NOW()
                WHERE id=$2 RETURNING *`;
  const { rows } = await pool.query(text, [cantidad_actual, id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Item no encontrado' });
};

/* DELETE /api/inventory/:id ──────────────────── */
export const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM inventario WHERE id=$1', [id]);
  res.sendStatus(204);
};
