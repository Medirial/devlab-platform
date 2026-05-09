const Quiz = require('../models/Quiz');
const config = require('../config/env');
const mockQuizzes = require('../data/mockQuizzes');

// Si USE_MOCK_DATA=true ou si Mongo n'est pas configure, on utilise les donnees mock
const shouldUseMockData = config.useMockData || !config.mongodbUri;
let quizzesData = shouldUseMockData ? [...mockQuizzes] : null;

// GET tous les quizzes
const getQuizzes = async (req, res) => {
  try {
    let quizzes;

    if (shouldUseMockData) {
      quizzes = quizzesData;
    } else {
      quizzes = await Quiz.find();
      if (!quizzes || quizzes.length === 0) {
        quizzes = mockQuizzes;
      }
    }

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un quiz par ID
const getQuizById = async (req, res) => {
  try {
    let quiz;

    if (shouldUseMockData) {
      quiz = quizzesData.find(q => q._id === req.params.id);
    } else {
      quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        quiz = mockQuizzes.find(q => q._id === req.params.id);
      }
    }

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz non trouvé',
      });
    }
    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un quiz
const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, questions } = req.body;

    if (shouldUseMockData) {
      // Créer un ID unique pour le mock data
      const newId = Date.now().toString();
      const newQuiz = {
        _id: newId,
        title,
        description,
        category,
        difficulty,
        questions,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      quizzesData.push(newQuiz);

      res.status(201).json({
        success: true,
        data: newQuiz,
      });
    } else {
      const quiz = new Quiz({
        title,
        description,
        category,
        difficulty,
        questions,
      });

      await quiz.save();

      res.status(201).json({
        success: true,
        data: quiz,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
};
