import { pool } from '../lib/db.js';

/* GET /stock (opcionalmente ?from=YYYY-MM-DD&to=&tipo=) */
export const getStockMoves = async (req, res) => {
  const { from, to, tipo } = req.query;
  const clauses = [];
  const values = [];

  if (from) { values.push(from); clauses.push(`fecha >= $${values.length}`); }
  if (to)   { values.push(to);   clauses.push(`fecha <= $${values.length}`); }
  if (tipo) { values.push(tipo); clauses.push(`tipo = $${values.length}`); }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const { rows } = await pool.query(`SELECT * FROM movimientos_stock ${where} ORDER BY id`, values);
  res.json(rows);
};

/* POST /stock */
export const createStockMove = async (req, res) => {
  const { producto_id, tipo, cantidad, usuario_id, proveedor_id } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO movimientos_stock
     (producto_id, tipo, cantidad, usuario_id, proveedor_id)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [producto_id, tipo, cantidad, usuario_id ?? null, proveedor_id ?? null]
  );

  /* Opcional: actualizar inventario */
  if (tipo === 'entrada') {
    await pool.query(
      `UPDATE inventario SET cantidad_actual = cantidad_actual + $1,
       fecha_actualizacion = NOW() WHERE producto_id=$2`,
      [cantidad, producto_id]
    );
  } else if (tipo === 'salida') {
    await pool.query(
      `UPDATE inventario SET cantidad_actual = cantidad_actual - $1,
       fecha_actualizacion = NOW() WHERE producto_id=$2`,
      [cantidad, producto_id]
    );
  }

  res.status(201).json(rows[0]);
};

/* DELETE /stock/:id */
export const deleteStockMove = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM movimientos_stock WHERE id=$1', [id]);
  res.sendStatus(204);
};
