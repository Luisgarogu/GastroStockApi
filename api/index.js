import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from '../routes/users.js';
import inventoryRoutes from '../routes/inventory.js';
import rolRoutes from '../routes/rol.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(bodyParser.json());

/* Rutas */
app.use('/users', usersRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/roles', rolRoutes);

app.get('/', (_, res) => res.send('API abierta 🚀'));

export default app;       
