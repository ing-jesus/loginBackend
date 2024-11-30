import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/usersRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], credentials: true }));
app.use(express.json());

// Rutas
app.use('/users', usersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
