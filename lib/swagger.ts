import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HULT Landing API',
      version: '1.0.0',
      description: 'API documentation for HULT Landing CRUD services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Profile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', nullable: true },
            first_name: { type: 'string', nullable: true },
            last_name: { type: 'string', nullable: true },
            // ... add more if needed
          },
        },
        ProfileInsert: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
            email: { type: 'string', nullable: true },
            first_name: { type: 'string', nullable: true },
            last_name: { type: 'string', nullable: true },
          },
        },
        Team: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', nullable: true },
          },
        },
        Challenge: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
          },
        },
        Submission: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            challenge_id: { type: 'string' },
            team_id: { type: 'string' },
            submitted_by: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./app/api/**/*.ts'],
};

export const spec = swaggerJsdoc(options);
