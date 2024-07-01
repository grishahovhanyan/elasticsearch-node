const { SWAGGER_TAGS, Swagger } = require('../utils')

module.exports = {
  put: {
    tags: [SWAGGER_TAGS.Todos],
    parameters: [
      Swagger.parameter('id', 'path', 'string', 'Todo ID', true)
    ],
    ...Swagger.requestBody('UpdateTodoBody', true),
    responses: {
      ...Swagger.notFound404()
    }
  }
}
