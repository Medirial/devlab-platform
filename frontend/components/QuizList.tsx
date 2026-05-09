'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import QuizCard from './QuizCard';
import { apiGet } from '@/lib/api';

interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Quiz[];
  error?: string;
}

type DifficultyFilter = 'Tous' | 'Facile' | 'Moyen' | 'Difficile';

interface QuizListProps {
  difficultyFilter?: DifficultyFilter;
}

export default function QuizList({ difficultyFilter = 'Tous' }: Readonly<QuizListProps>) {
  const { theme } = useTheme();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cloudCategories = new Set(['AWS', 'Azure', 'Linux', 'Docker', 'Cloud']);

  const cloudQuizzes = quizzes.filter((quiz) => cloudCategories.has(quiz.category));

  const filteredQuizzes = cloudQuizzes.filter((quiz) => {
    if (difficultyFilter === 'Tous') {
      return true;
    }
    return quiz.difficulty === difficultyFilter;
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await apiGet<ApiResponse>('/quizzes');
        setQuizzes(response.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des quizzes');
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div style={{
        padding: `${theme.spacing.md} 0`,
        color: theme.colors.textSecondary,
      }}>
        <p style={{ marginBottom: theme.spacing.md, fontSize: theme.typography.small }}>
          Chargement des quizzes...
        </p>
        <div style={{ display: 'grid', gap: theme.spacing.md }}>
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className='quiz-skeleton-card'
              style={{
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                backgroundColor: theme.colors.surface,
                boxShadow: `0 10px 22px ${theme.colors.shadow}`,
              }}
            >
              <div className='quiz-skeleton-line quiz-skeleton-line-title' />
              <div className='quiz-skeleton-line quiz-skeleton-line-body' />
              <div className='quiz-skeleton-line quiz-skeleton-line-body short' />
              <div className='quiz-skeleton-row'>
                <div className='quiz-skeleton-chip' />
                <div className='quiz-skeleton-chip' />
                <div className='quiz-skeleton-button' />
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: `${theme.spacing.lg} ${theme.spacing.md}`,
        textAlign: 'center',
        color: theme.colors.danger,
        backgroundColor: `${theme.colors.danger}20`,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.danger}`,
      }}>
        <p>Erreur : {error}</p>
      </div>
    );
  }

  if (filteredQuizzes.length === 0) {
    return (
      <div style={{
        padding: `${theme.spacing.lg} ${theme.spacing.md}`,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
      }}>
        <p>
          {difficultyFilter === 'Tous'
            ? 'Aucun quiz cloud disponible pour le moment.'
            : `Aucun quiz cloud de niveau ${difficultyFilter} pour le moment.`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{
        marginBottom: theme.spacing.md,
        color: theme.colors.textSecondary,
        fontSize: theme.typography.small,
      }}>
        {filteredQuizzes.length} Quiz{filteredQuizzes.length > 1 ? 'zes' : ''}
      </p>
      {filteredQuizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}
