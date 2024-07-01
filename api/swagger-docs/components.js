const { ERROR_MESSAGES } = require('../src/utils/messages.js')

module.exports = {
  components: {
    securitySchemes: {
      BearerAuth: {
        description: 'Authorization header',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
        in: 'header'
      }
    },
    schemas: {
      Success: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'success'
          }
        }
      },
      // ======= Errors =======
      NotFoundException: {
        type: 'object',
        properties: {
          detail: {
            type: 'string',
            example: ERROR_MESSAGES.notFound404
          }
        }
      },
      CreateTodoBody: {
        properties: {
          userId: {
            type: 'string',
            required: true
          },
          title: {
            type: 'string',
            required: true
          },
          completed: {
            type: 'boolean',
            required: false
          }
        }
      },
      UpdateTodoBody: {
        properties: {
          userId: {
            type: 'string',
            required: false
          },
          title: {
            type: 'string',
            required: false
          },
          completed: {
            type: 'boolean',
            required: false
          }
        }
      }
    }
  }
}
