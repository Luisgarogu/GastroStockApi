import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import inventoryRoutes from './routes/inventory.js';
import rolRoutes from './routes/rol.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* Middlewares */
app.use(cors());
app.use(bodyParser.json());

/* Rutas */
app.use('/api/users', usersRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/roles', rolRoutes);

app.get('/', (_, res) => res.send('API abierta 🚀'));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
