import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from '../routes/users.js';
import inventoryRoutes from '../routes/inventory.js';
import rolRoutes from '../routes/rol.js';
import productsRoutes   from '../routes/products.js';
import providersRoutes  from '../routes/providers.js';
import stockRoutes      from '../routes/stock.js';
import aiRoutes      from '../routes/ai.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(bodyParser.json());
//const PORT = process.env.PORT || 8000;
/* Rutas */
// api/index.js
app.use('/api/users', usersRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/ai', aiRoutes);   


//app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

app.get('/api', (_, res) => res.send('API abierta 🚀'));


export default app;       
