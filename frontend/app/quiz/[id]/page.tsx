'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import QuizPlayer from '@/components/QuizPlayer';
import { apiGet } from '@/lib/api';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Quiz;
  error?: string;
}

export default function QuizPage() {
  const { theme } = useTheme();
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await apiGet<ApiResponse>(`/quizzes/${quizId}`);
        setQuiz(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Quiz non trouvé');
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div style={{
        padding: theme.spacing.lg,
        textAlign: 'center',
        backgroundColor: theme.colors.background,
        backgroundImage: theme.effects.backgroundGradient,
        color: theme.colors.textSecondary,
        minHeight: '100vh',
      }}>
        <ThemeToggle />
        <p>Chargement du quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: `${theme.spacing.lg} auto`,
        padding: theme.spacing.lg,
        textAlign: 'center',
        backgroundColor: theme.colors.background,
        backgroundImage: theme.effects.backgroundGradient,
        color: theme.colors.text,
      }}>
        <ThemeToggle />
        <p style={{ color: theme.colors.danger, marginBottom: theme.spacing.md }}>
          Erreur : {error}
        </p>
        <a href="/" style={{
          display: 'inline-block',
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          backgroundColor: theme.colors.primary,
          color: theme.colors.background,
          textDecoration: 'none',
          borderRadius: theme.borderRadius.md,
        }}>
          Retour aux Quizzes
        </a>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{
        padding: theme.spacing.lg,
        textAlign: 'center',
        backgroundColor: theme.colors.background,
        backgroundImage: theme.effects.backgroundGradient,
        color: theme.colors.textSecondary,
        minHeight: '100vh',
      }}>
        <ThemeToggle />
        <p>Quiz non trouvé</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      backgroundImage: theme.effects.backgroundGradient,
      color: theme.colors.text,
      minHeight: '100vh',
    }}>
      <ThemeToggle />
      <QuizPlayer quiz={quiz} />
    </div>
  );
}
