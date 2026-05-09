const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz } = require('../controllers/quizController');

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Récupérer tous les quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: Liste de tous les quizzes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Récupérer un quiz par ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du quiz
 *     responses:
 *       200:
 *         description: Quiz trouvé
 *       404:
 *         description: Quiz non trouvé
 */
router.get('/:id', getQuizById);

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Créer un nouveau quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               questions:
 *                 type: array
 *     responses:
 *       201:
 *         description: Quiz créé avec succès
 *       400:
 *         description: Erreur validation
 */
router.post('/', createQuiz);

module.exports = router;
