const express = require('express');
const router = express.Router();

// Route santé de l'API
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API opérationnelle',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
