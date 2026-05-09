require('dotenv').config({ path: '../.env' });

const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
};

// Valider les variables critiques
if (!config.mongodbUri && config.nodeEnv === 'production') {
  throw new Error('MONGODB_URI est requise en production');
}

module.exports = config;
