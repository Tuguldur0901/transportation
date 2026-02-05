require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const cargoRoutes = require('./routes/cargoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API замууд
app.use('/api/auth', authRoutes);
app.use('/api/cargo', cargoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер ${PORT} порт дээр аслаа...`);
});