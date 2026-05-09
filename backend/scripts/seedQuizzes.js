const mongoose = require('mongoose');
const config = require('../config/env');
const Quiz = require('../models/Quiz');
const mockQuizzes = require('../data/mockQuizzes');

const shouldReset = process.argv.includes('--reset');

const toPersistableQuiz = (quiz) => {
  const { _id, ...rest } = quiz;
  return rest;
};

const run = async () => {
  if (!config.mongodbUri) {
    console.error('MONGODB_URI non defini. Impossible de lancer le seed.');
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connecte pour le seed.');

    if (shouldReset) {
      await Quiz.deleteMany({ category: { $in: ['Docker', 'AWS', 'Azure', 'Linux', 'Cloud'] } });
      console.log('Quizzes cloud existants supprimes (mode --reset).');
    }

    let upserted = 0;

    for (const rawQuiz of mockQuizzes) {
      const quiz = toPersistableQuiz(rawQuiz);

      await Quiz.findOneAndUpdate(
        { title: quiz.title },
        {
          $set: {
            description: quiz.description,
            category: quiz.category,
            difficulty: quiz.difficulty,
            questions: quiz.questions,
            createdAt: quiz.createdAt,
          },
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );

      upserted += 1;
    }

    const totalCloud = await Quiz.countDocuments({ category: { $in: ['Docker', 'AWS', 'Azure', 'Linux', 'Cloud'] } });

    console.log(`Seed termine: ${upserted} quizzes traites.`);
    console.log(`Total quizzes cloud en base: ${totalCloud}`);
    process.exit(0);
  } catch (error) {
    console.error('Erreur seed quizzes:', error.message);
    process.exit(1);
  }
};

run();
