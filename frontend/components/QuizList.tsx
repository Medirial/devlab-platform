'use client';

import { useState, useEffect } from 'react';
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

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Chargement des quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: '#f44336' }}>Erreur : {error}</p>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: '#999' }}>Aucun quiz disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>
        {quizzes.length} Quiz{quizzes.length > 1 ? 'zes' : ''}
      </h2>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}
