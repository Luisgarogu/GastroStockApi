import { pool } from '../lib/db.js';

/* GET /products */
export const getProducts = async (_, res) => {
  const { rows } = await pool.query('SELECT * FROM productos ORDER BY id');
  res.json(rows);
};

/* GET /products/:id */
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Producto no encontrado' });
};

/* POST /products */
export const createProduct = async (req, res) => {
  const { nombre, categoria, unidad_medida, stock_minimo } = req.body;
  const text = `INSERT INTO productos(nombre,categoria,unidad_medida,stock_minimo)
                VALUES($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(text, [nombre, categoria, unidad_medida, stock_minimo]);
  res.status(201).json(rows[0]);
};

/* PUT /products/:id */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, unidad_medida, stock_minimo } = req.body;
  const text = `UPDATE productos SET
                nombre=$1, categoria=$2, unidad_medida=$3, stock_minimo=$4
                WHERE id=$5 RETURNING *`;
  const { rows } = await pool.query(text, [nombre, categoria, unidad_medida, stock_minimo, id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Producto no encontrado' });
};

/* DELETE /products/:id */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM productos WHERE id=$1', [id]);
  res.sendStatus(204);
};
