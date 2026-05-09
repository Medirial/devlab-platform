const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const healthRoutes = require('./routes/health');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API backend opérationnelle !');
});

app.use('/api/health', healthRoutes);

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${config.port}`);
  console.log(`📍 Environnement : ${config.nodeEnv}`);
});
