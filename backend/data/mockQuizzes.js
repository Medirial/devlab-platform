const mockQuizzes = [
  {
    _id: '1',
    title: 'JavaScript Basics',
    description: 'Testez vos connaissances fondamentales en JavaScript',
    category: 'JavaScript',
    difficulty: 'Facile',
    questions: [
      {
        question: 'Quel est le résultat de 2 + 2?',
        options: ['3', '4', '5'],
        correctAnswer: 1,
        explanation: '2 + 2 égale 4',
      },
      {
        question: 'Comment déclarer une variable en JavaScript?',
        options: ['var x = 5', 'variable x = 5', 'v x = 5'],
        correctAnswer: 0,
        explanation: 'On utilise var, let ou const pour déclarer une variable',
      },
      {
        question: 'Quel est le type de null?',
        options: ['object', 'null', 'undefined'],
        correctAnswer: 0,
        explanation: 'typeof null retourne "object" (c\'est une bizarrerie de JavaScript)',
      },
    ],
    createdAt: '2026-05-09T10:00:00Z',
    updatedAt: '2026-05-09T10:00:00Z',
  },
  {
    _id: '2',
    title: 'React Hooks',
    description: 'Maîtrisez les hooks React et les bonnes pratiques',
    category: 'React',
    difficulty: 'Moyen',
    questions: [
      {
        question: 'Quel hook est utilisé pour gérer l\'état?',
        options: ['useEffect', 'useState', 'useContext'],
        correctAnswer: 1,
        explanation: 'useState est le hook pour gérer l\'état local d\'un composant',
      },
      {
        question: 'Quand useEffect s\'exécute-t-il?',
        options: [
          'Avant le rendu',
          'Après le rendu',
          'Pendant le rendu',
        ],
        correctAnswer: 1,
        explanation: 'useEffect s\'exécute après que le composant soit rendu',
      },
      {
        question: 'Quel est le tableau de dépendances pour exécuter une fois?',
        options: ['[1]', '[]', '[undefined]'],
        correctAnswer: 1,
        explanation: 'Un tableau vide [] signifie que l\'effet ne s\'exécute qu\'une fois au montage',
      },
      {
        question: 'Quel hook remplace componentDidMount?',
        options: ['useCallback', 'useEffect avec []', 'useMemo'],
        correctAnswer: 1,
        explanation: 'useEffect avec un tableau de dépendances vide remplace componentDidMount',
      },
    ],
    createdAt: '2026-05-09T10:10:00Z',
    updatedAt: '2026-05-09T10:10:00Z',
  },
  {
    _id: '3',
    title: 'Docker Essentials',
    description: 'Les bases de Docker et la containerisation',
    category: 'Docker',
    difficulty: 'Moyen',
    questions: [
      {
        question: 'Qu\'est-ce qu\'un container Docker?',
        options: [
          'Un dossier',
          'Une instance légère d\'une application isolée',
          'Une base de données',
        ],
        correctAnswer: 1,
        explanation: 'Un container est une unité logicielle qui package une application avec toutes ses dépendances',
      },
      {
        question: 'Quelle commande lance un container?',
        options: ['docker start', 'docker run', 'docker create'],
        correctAnswer: 1,
        explanation: 'docker run crée et démarre un nouveau container',
      },
      {
        question: 'Qu\'est-ce qu\'un Dockerfile?',
        options: [
          'Un fichier de configuration Docker',
          'Un fichier qui définit comment construire une image',
          'Un fichier de données',
        ],
        correctAnswer: 1,
        explanation: 'Le Dockerfile contient les instructions pour construire une image Docker',
      },
    ],
    createdAt: '2026-05-09T10:20:00Z',
    updatedAt: '2026-05-09T10:20:00Z',
  },
  {
    _id: '4',
    title: 'AWS EC2 Basics',
    description: 'Comprendre les bases d\'AWS EC2',
    category: 'AWS',
    difficulty: 'Difficile',
    questions: [
      {
        question: 'Qu\'est-ce qu\'une instance EC2?',
        options: [
          'Un serveur virtuel sur AWS',
          'Une base de données',
          'Un service de stockage',
        ],
        correctAnswer: 0,
        explanation: 'EC2 (Elastic Compute Cloud) fournit des serveurs virtuels évolutifs',
      },
      {
        question: 'Qu\'est-ce qu\'un Security Group?',
        options: [
          'Un groupe d\'utilisateurs',
          'Un pare-feu virtuel pour contrôler le trafic',
          'Un groupe de bases de données',
        ],
        correctAnswer: 1,
        explanation: 'Les Security Groups contrôlent le trafic entrant et sortant des instances',
      },
      {
        question: 'Qu\'est-ce qu\'une Elastic IP?',
        options: [
          'Une adresse IP statique associée à un compte AWS',
          'Une adresse IP dynamique',
          'Un type de serveur',
        ],
        correctAnswer: 0,
        explanation: 'Une Elastic IP est une adresse IP statique qui peut être associée à une instance',
      },
      {
        question: 'Quel type d\'instance EC2 est gratuit?',
        options: [
          't4.nano',
          't2.micro (dans le free tier)',
          't3.small',
        ],
        correctAnswer: 1,
        explanation: 't2.micro est inclus dans le AWS Free Tier pendant 12 mois',
      },
    ],
    createdAt: '2026-05-09T10:30:00Z',
    updatedAt: '2026-05-09T10:30:00Z',
  },
  {
    _id: '5',
    title: 'Node.js Advanced',
    description: 'Concepts avancés de Node.js et Express',
    category: 'Node.js',
    difficulty: 'Difficile',
    questions: [
      {
        question: 'Qu\'est-ce que la boucle d\'événements (Event Loop)?',
        options: [
          'Une boucle qui exécute du code synchrone',
          'Un mécanisme qui gère les opérations asynchrones',
          'Un serveur web',
        ],
        correctAnswer: 1,
        explanation: 'La Event Loop gère les callbacks et les opérations asynchrones en Node.js',
      },
      {
        question: 'Comment gérer les erreurs dans async/await?',
        options: [
          '.catch()',
          'try/catch',
          '.finally()',
        ],
        correctAnswer: 1,
        explanation: 'try/catch est la meilleure façon de gérer les erreurs avec async/await',
      },
    ],
    createdAt: '2026-05-09T10:40:00Z',
    updatedAt: '2026-05-09T10:40:00Z',
  },
];

module.exports = mockQuizzes;
