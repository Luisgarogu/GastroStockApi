import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
console.log('🔑 PG_CONNECTION_STRING:', JSON.stringify(process.env.PG_CONNECTION_STRING));

export const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }   // requerido en Supabase free
});
