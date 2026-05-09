'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

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

interface QuizCardProps {
  quiz: Quiz;
}

const categoryColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  React: '#61DAFB',
  'Node.js': '#68A063',
  Docker: '#2496ED',
  AWS: '#FF9900',
  Azure: '#0078D4',
  Linux: '#FCC624',
  Cloud: '#4285F4',
  Autre: '#9C27B0',
};

export default function QuizCard({ quiz }: Readonly<QuizCardProps>) {
  const { theme } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return theme.colors.success;
      case 'Moyen':
        return theme.colors.warning;
      case 'Difficile':
        return theme.colors.danger;
      default:
        return theme.colors.primary;
    }
  };

  const getCategoryBgColor = (category: string) => {
    return categoryColors[category] || theme.colors.primary;
  };

  return (
    <article className='quiz-card-modern' style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      backgroundImage: `linear-gradient(180deg, ${theme.colors.surface} 0%, ${theme.colors.background} 100%)`,
      boxShadow: `0 10px 22px ${theme.colors.shadow}`,
    }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: theme.spacing.md,
      }}>
        <h3 style={{
          margin: '0 0 5px 0',
          color: theme.colors.text,
          fontSize: theme.typography.h3,
        }}>
          {quiz.title}
        </h3>
        <span style={{
          backgroundColor: getCategoryBgColor(quiz.category),
          color: '#0b1220',
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          borderRadius: '999px',
          fontSize: theme.typography.small,
          fontWeight: '700',
          whiteSpace: 'nowrap',
        }}>
          {quiz.category}
        </span>
      </div>

      <p style={{
        margin: `0 0 ${theme.spacing.lg} 0`,
        color: theme.colors.textSecondary,
        fontSize: theme.typography.body,
        lineHeight: '1.5',
      }}>
        {quiz.description}
      </p>

      <div style={{
        display: 'flex',
        gap: theme.spacing.md,
        alignItems: 'center',
      }}>
        <span style={{
          backgroundColor: getDifficultyColor(quiz.difficulty),
          color: theme.colors.background,
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.small,
          fontWeight: '500',
        }}>
          {quiz.difficulty}
        </span>
        <span style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.small,
        }}>
          {quiz.questions.length} questions
        </span>
        <Link href={`/quiz/${quiz._id}`} style={{
          marginLeft: 'auto',
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          color: '#ffffff',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: theme.typography.small,
          fontWeight: '700',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          boxShadow: `0 10px 20px ${theme.colors.shadow}`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 24px ${theme.colors.shadow}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 20px ${theme.colors.shadow}`;
        }}
        >
          Commencer
        </Link>
      </div>
    </article>
  );
}
