const express = require('express');
const config = require('./config/env');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API backend opérationnelle !');
});

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${config.port}`);
  console.log(`📍 Environnement : ${config.nodeEnv}`);
});
