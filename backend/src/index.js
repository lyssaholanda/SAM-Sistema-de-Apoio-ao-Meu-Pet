import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { petsRouter } from './routes/pets.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pets', petsRouter);

app.get('/', (req, res) => {
  res.json({ status: 'SAM backend rodando 🐾' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
