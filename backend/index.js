const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const config = require('./config/env');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const healthRoutes = require('./routes/health');
const quizzesRoutes = require('./routes/quizzes');

const app = express();

// Connexion MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
  res.send('API backend opérationnelle !');
});

app.use('/api/health', healthRoutes);
app.use('/api/quizzes', quizzesRoutes);

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${config.port}`);
  console.log(`Environnement : ${config.nodeEnv}`);
  console.log(`Documentation API : http://localhost:${config.port}/api-docs`);
});
