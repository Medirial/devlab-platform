const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevLab Platform API',
      version: '1.0.0',
      description: 'API backend pour la plateforme de quiz DevLab',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Serveur local de développement',
      },
    ],
    components: {
      schemas: {
        HealthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            message: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
        Quiz: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: {
              type: 'string',
              enum: ['JavaScript', 'React', 'Node.js', 'Docker', 'AWS', 'Cloud', 'Autre'],
            },
            difficulty: {
              type: 'string',
              enum: ['Facile', 'Moyen', 'Difficile'],
            },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                  correctAnswer: { type: 'number' },
                  explanation: { type: 'string' },
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            count: { type: 'number' },
            data: { type: 'array' },
            error: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
