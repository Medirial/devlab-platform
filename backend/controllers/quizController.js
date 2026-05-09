const Quiz = require('../models/Quiz');

// GET tous les quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
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
    const quiz = await Quiz.findById(req.params.id);
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
