const {
  SWAGGER_TAGS,
  Swagger,
} = require('../utils')

const { query } = Swagger.parameterIn
const { integer, string, boolean } = Swagger.varTypes

module.exports = {
  get: {
    tags: [SWAGGER_TAGS.Todos],
    parameters: [
      Swagger.parameter('page', query, integer),
      Swagger.parameter('perPage', query, integer, 'Todos'),
      Swagger.parameter('s', query, string),
      Swagger.parameter('completed', query, boolean),
      Swagger.parameter('userIds', query, string, 'userId1,userId2,userId3...')
    ],
    responses: {}
  }
}
