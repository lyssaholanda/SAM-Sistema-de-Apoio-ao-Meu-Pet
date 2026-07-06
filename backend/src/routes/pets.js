import { Router } from 'express';
import { pool } from '../db/pool.js';

export const petsRouter = Router();

// GET /api/pets — lista pets (exemplo inicial, ajustar quando o schema existir)
petsRouter.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pets');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: 'Erro ao buscar pets' });
  }
});
