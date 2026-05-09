const mongoose = require('mongoose');
const config = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Connexion MongoDB déjà établie');
    return;
  }

  if (!config.mongodbUri) {
    console.error('MONGODB_URI non défini dans .env');
    return;
  }

  try {
    await mongoose.connect(config.mongodbUri);

    isConnected = true;
    console.log('Connexion MongoDB établie');
  } catch (error) {
    console.error('Erreur connexion MongoDB:', error.message);
    isConnected = false;
  }
};

module.exports = connectDB;
