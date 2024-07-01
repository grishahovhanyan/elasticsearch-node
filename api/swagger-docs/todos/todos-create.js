const { SWAGGER_TAGS, Swagger } = require('../utils')

module.exports = {
  post: {
    tags: [SWAGGER_TAGS.Todos],
    ...Swagger.requestBody('CreateTodoBody', true),
    responses: {}
  }
}
