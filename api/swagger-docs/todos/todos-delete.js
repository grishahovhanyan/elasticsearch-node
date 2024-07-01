const { SWAGGER_TAGS, Swagger } = require('../utils')

const { path } = Swagger.parameterIn
const { string } = Swagger.varTypes

module.exports = {
  delete: {
    tags: [SWAGGER_TAGS.Todos],
    parameters: [
      Swagger.parameter('id', path, string, 'Todo Id', true)
    ],
    responses: {
      ...Swagger.notFound404()
    }
  }
}
