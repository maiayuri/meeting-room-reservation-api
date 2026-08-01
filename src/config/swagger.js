const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reserva de Salas de Reunião',
      version: '1.0.0',
      description:
        'API para criação e listagem de reservas de salas de reunião.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        ReservationInput: {
          type: 'object',
          required: ['roomId', 'startDateTime', 'endDateTime', 'host'],
          properties: {
            roomId: {
              type: 'string',
              description: 'ID da sala a ser reservada.',
              example: '1',
            },
            startDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de início da reserva (ISO 8601).',
              example: '2026-08-05T14:00:00.000Z',
            },
            endDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de término da reserva (ISO 8601).',
              example: '2026-08-05T15:00:00.000Z',
            },
            host: {
              type: 'string',
              description: 'Nome do responsável pela reserva.',
              example: 'Yuri Maia',
            },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID gerado para a reserva.',
              example: 'e3b0c442-98fc-4e1b-93b1-3a2c2b6f6d21',
            },
            roomId: {
              type: 'string',
              description: 'ID da sala reservada.',
              example: '1',
            },
            startDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de início da reserva (ISO 8601).',
              example: '2026-08-05T14:00:00.000Z',
            },
            endDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de término da reserva (ISO 8601).',
              example: '2026-08-05T15:00:00.000Z',
            },
            host: {
              type: 'string',
              description: 'Nome do responsável pela reserva.',
              example: 'Yuri Maia',
            },
          },
        },
        Room: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '1',
            },
            name: {
              type: 'string',
              example: 'Sala Alpha',
            },
            size: {
              type: 'string',
              enum: ['pequena', 'grande'],
              example: 'pequena',
            },
            capacity: {
              type: 'integer',
              example: 4,
            },
            location: {
              type: 'string',
              example: '1º andar',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Mensagem descrevendo o erro.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
