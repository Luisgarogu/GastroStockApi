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

  try {
    await pool.query('BEGIN');

    await pool.query('DELETE FROM inventario        WHERE producto_id = $1', [id]);
    await pool.query('DELETE FROM movimientos_stock WHERE producto_id = $1', [id]); // opcional

    const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1', [id]);

    await pool.query('COMMIT');

    if (rowCount) return res.sendStatus(204);
    return res.status(404).json({ msg: 'Producto no encontrado' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ msg: 'No se pudo eliminar el producto' });
  }
};

