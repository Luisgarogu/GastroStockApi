import { pool } from '../lib/db.js';

/* GET /api/roles ─────────────────────────── */
export const getRoles = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM roles ORDER BY id'); 
    res.json(rows);
  };
