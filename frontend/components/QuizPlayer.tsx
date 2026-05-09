'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizPlayerProps {
  quiz: {
    _id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    questions: Question[];
  };
}

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
  const { theme } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerClick = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const getProgressColor = () => {
    const percent = (score / quiz.questions.length) * 100;
    if (percent >= 80) return theme.colors.success;
    if (percent >= 60) return theme.colors.warning;
    return theme.colors.danger;
  };

  if (finished) {
    const finalPercent = (score / quiz.questions.length) * 100;
    return (
      <div style={{
        maxWidth: '600px',
        margin: `${theme.spacing.lg} auto`,
        padding: `${theme.spacing.lg} 0 90px`,
        textAlign: 'center',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}>
        <h2 style={{
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}>
          Quiz Terminé !
        </h2>

        <div style={{
          fontSize: '3em',
          fontWeight: 'bold',
          color: getProgressColor(),
          marginBottom: theme.spacing.lg,
        }}>
          {score} / {quiz.questions.length}
        </div>

        <div style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          marginBottom: theme.spacing.lg,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <p style={{
            fontSize: theme.typography.h3,
            color: theme.colors.text,
            margin: 0,
          }}>
            Vous avez obtenu <strong>{finalPercent.toFixed(1)}%</strong>
          </p>
          {finalPercent >= 80 && (
            <p style={{ color: theme.colors.success, marginTop: theme.spacing.md }}>
              Excellent travail !
            </p>
          )}
          {finalPercent >= 60 && finalPercent < 80 && (
            <p style={{ color: theme.colors.warning, marginTop: theme.spacing.md }}>
              Bien joué !
            </p>
          )}
          {finalPercent < 60 && (
            <p style={{ color: theme.colors.danger, marginTop: theme.spacing.md }}>
              Continuez vos efforts !
            </p>
          )}
        </div>

        <a href="/" style={{
          display: 'inline-block',
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.primary,
          color: theme.colors.background,
          textDecoration: 'none',
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = '1';
        }}
        >
          Retour aux Quizzes
        </a>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: `${theme.spacing.lg} ${theme.spacing.md} 90px`,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    }}>
      {/* Header */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <h2 style={{
          margin: `0 0 ${theme.spacing.md} 0`,
          color: theme.colors.text,
          fontSize: theme.typography.h2,
        }}>
          {quiz.title}
        </h2>
        <p style={{
          margin: 0,
          color: theme.colors.textSecondary,
          fontSize: theme.typography.small,
        }}>
          Question {currentQuestionIndex + 1} / {quiz.questions.length}
        </p>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: theme.colors.border,
          borderRadius: theme.borderRadius.sm,
          marginTop: theme.spacing.md,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: theme.colors.primary,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
        border: `1px solid ${theme.colors.border}`,
      }}>
        <h3 style={{
          margin: `0 0 ${theme.spacing.lg} 0`,
          fontSize: theme.typography.h3,
          color: theme.colors.text,
          lineHeight: '1.6',
        }}>
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          {currentQuestion.options.map((option, index) => {
            const isSelectedOption = index === selectedAnswer;
            const isCorrectOption = index === currentQuestion.correctAnswer;

            let backgroundColor = theme.colors.background;
            let borderColor = theme.colors.border;
            let cursor = answered ? 'default' : 'pointer';
            let textColor = theme.colors.text;

            if (answered) {
              if (isCorrectOption) {
                backgroundColor = theme.colors.success + '20';
                borderColor = theme.colors.success;
                textColor = theme.colors.text;
              } else if (isSelectedOption && !isCorrectOption) {
                backgroundColor = theme.colors.danger + '20';
                borderColor = theme.colors.danger;
                textColor = theme.colors.text;
              }
            } else if (isSelectedOption) {
              backgroundColor = theme.colors.primary + '20';
              borderColor = theme.colors.primary;
              textColor = theme.colors.primary;
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                  padding: theme.spacing.lg,
                  textAlign: 'left',
                  border: `2px solid ${borderColor}`,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor,
                  color: textColor,
                  cursor,
                  fontSize: theme.typography.body,
                  transition: 'all 0.2s ease',
                  fontWeight: isSelectedOption ? '600' : '400',
                }}
                onMouseEnter={(e) => {
                  if (!answered) {
                    (e.currentTarget as HTMLElement).style.borderColor = theme.colors.primary;
                    (e.currentTarget as HTMLElement).style.backgroundColor = theme.colors.primary + '10';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!answered && !isSelectedOption) {
                    (e.currentTarget as HTMLElement).style.borderColor = theme.colors.border;
                    (e.currentTarget as HTMLElement).style.backgroundColor = theme.colors.background;
                  }
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {answered && (
        <div style={{
          backgroundColor: isCorrect ? theme.colors.success + '15' : theme.colors.danger + '15',
          border: `2px solid ${isCorrect ? theme.colors.success : theme.colors.danger}`,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        }}>
          <p style={{
            margin: `0 0 ${theme.spacing.md} 0`,
            fontWeight: 'bold',
            color: isCorrect ? theme.colors.success : theme.colors.danger,
          }}>
            {isCorrect ? 'Correct !' : 'Incorrect'}
          </p>
          <p style={{
            margin: 0,
            color: theme.colors.text,
            lineHeight: '1.6',
          }}>
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      {answered && (
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.body,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
        >
          {isLastQuestion ? 'Voir le Résultat' : 'Suivant'}
        </button>
      )}
    </div>
  );
}
