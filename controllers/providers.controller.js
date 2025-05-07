import { pool } from '../lib/db.js';

export const getProviders = async (_, res) => {
  const { rows } = await pool.query('SELECT * FROM proveedores ORDER BY id');
  res.json(rows);
};

export const getProvider = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM proveedores WHERE id=$1', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Proveedor no encontrado' });
};

export const createProvider = async (req, res) => {
  const { nombre, contacto, telefono } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO proveedores(nombre,contacto,telefono)
     VALUES($1,$2,$3) RETURNING *`,
    [nombre, contacto, telefono]
  );
  res.status(201).json(rows[0]);
};

export const updateProvider = async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono } = req.body;
  const { rows } = await pool.query(
    `UPDATE proveedores SET nombre=$1, contacto=$2, telefono=$3
     WHERE id=$4 RETURNING *`,
    [nombre, contacto, telefono, id]
  );
  rows.length ? res.json(rows[0]) : res.status(404).json({ msg: 'Proveedor no encontrado' });
};

export const deleteProvider = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM proveedores WHERE id=$1', [id]);
  res.sendStatus(204);
};
