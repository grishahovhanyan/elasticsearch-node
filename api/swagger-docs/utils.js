const SWAGGER_TAGS = {
  Todos: 'Todos'
}

class Swagger {
  static parameterIn = {
    path: 'path',
    query: 'query'
  }

  static varTypes = {
    integer: 'integer',
    string: 'string',
    boolean: 'boolean'
  }

  /**
   * @param {string} name 
   * @param {'path' | 'query'} place 
   * @param {'integer' | 'string'} type 
   * @param {string | undefined} description 
   * @param {boolean} isRequired 
   * @param {number | string | undefined} defaultValue 
   * @param {number | string | undefined} maximum 
   */
  static parameter(name, place, type, description, isRequired = false, defaultValue, maximum) {
    let swaggerDescription = description
    if (name === 'perPage') {
      swaggerDescription += ' count in each page'
    }

    return {
      name,
      in: place,
      schema: { type, maximum },
      description: swaggerDescription,
      required: isRequired,
      default: defaultValue
    }
  }

  /**
   * @param {string} name 
   * @param {'path' | 'query'} place 
   * @param {'integer' | 'string'} type 
   * @param {string[] | number[] | boolean[]} enumArray 
   * @param {boolean} isRequired 
   */
  static enumParameter(name, place, type, enumArray, isRequired = false) {
    return {
      name,
      in: place,
      schema: { type, enum: enumArray },
      required: isRequired
    }
  }

  /**
   * @param {string | { properties: object }} schema 
   * @param {boolean} isRequired 
   * @param {string | undefined} description 
   */
  static requestBody(schema, isRequired = false, description) {
    let swaggerSchema
    if (typeof schema === 'string') {
      swaggerSchema = { $ref: `#/components/schemas/${schema}` }
    } else {
      swaggerSchema = schema
    }

    return {
      requestBody: {
        required: isRequired,
        description,
        content: {
          'application/json': { schema: swaggerSchema },
          'application/x-www-form-urlencoded': { schema: swaggerSchema }
        }
      }
    }
  }

  /**
   * @param {string | { properties: object }}  schema
   * @param {string | undefined} description 
   */
  static success200(schema, description) {
    let swaggerSchema = {}

    if (typeof schema === 'object') {
      swaggerSchema = schema
    } else {
      swaggerSchema = { $ref: `#/components/schemas/${schema}` }
    }

    return {
      200: {
        description,
        content: { 'application/json': { schema: swaggerSchema } }
      }
    }
  }

  /**
   * @param {string}  schema
   * @param {string | undefined} description 
   */
  static created201(schema, description) {
    return {
      201: {
        description,
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${schema}`
            }
          }
        }
      }
    }
  }

  /**
   * @param {string | string[] | { properties: object }} schema
   */
  static badRequest400(schema) {
    let swaggerSchema = {}

    if (typeof schema === 'object') {
      if (Array.isArray(schema)) {
        const oneOf = schema.map(S => ({ $ref: `#/components/schemas/${S}` }))
        swaggerSchema = { oneOf }
      } else {
        swaggerSchema = schema
      }
    } else {
      swaggerSchema = { $ref: `#/components/schemas/${schema}` }
    }

    return {
      400: {
        description: 'Bad Request',
        content: { 'application/json': { schema: swaggerSchema } }
      }
    }
  }

  static unauthorized401() {
    return {
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Unauthorized'
            }
          }
        }
      }
    }
  }

  static forbidden403() {
    return {
      403: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForbiddenException'
            }
          }
        }
      }
    }
  }

  static notFound404() {
    return {
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotFoundException'
            }
          }
        }
      }
    }
  }
}

module.exports = {
  SWAGGER_TAGS,
  Swagger
}
