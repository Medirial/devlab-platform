const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifier l'état de l'API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API opérationnelle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API opérationnelle',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
