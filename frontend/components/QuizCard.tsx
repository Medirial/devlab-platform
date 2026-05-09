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

export default function QuizCard({ quiz }: QuizCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return '#4CAF50';
      case 'Moyen':
        return '#FFC107';
      case 'Difficile':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  const getCategoryBgColor = (category: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#F7DF1E',
      React: '#61DAFB',
      'Node.js': '#68A063',
      Docker: '#2496ED',
      AWS: '#FF9900',
      Cloud: '#4285F4',
      Autre: '#9C27B0',
    };
    return colors[category] || '#999';
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{quiz.title}</h3>
        <span style={{
          backgroundColor: getCategoryBgColor(quiz.category),
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}>
          {quiz.category}
        </span>
      </div>

      <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
        {quiz.description}
      </p>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span style={{
          backgroundColor: getDifficultyColor(quiz.difficulty),
          color: '#fff',
          padding: '5px 12px',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: '500',
        }}>
          {quiz.difficulty}
        </span>
        <span style={{ color: '#999', fontSize: '13px' }}>
          {quiz.questions.length} questions
        </span>
        <button style={{
          marginLeft: 'auto',
          padding: '8px 16px',
          backgroundColor: '#2196F3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}>
          Commencer
        </button>
      </div>
    </div>
  );
}
