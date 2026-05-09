const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['JavaScript', 'React', 'Node.js', 'Docker', 'AWS', 'Azure', 'Linux', 'Cloud', 'Autre'],
      default: 'Autre',
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
      },
    ],
    difficulty: {
      type: String,
      enum: ['Facile', 'Moyen', 'Difficile'],
      default: 'Moyen',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
