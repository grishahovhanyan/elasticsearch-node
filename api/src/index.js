require('dotenv/config')
const app = require('express')()
const { expressErrorHandler, requestLogger } = require('./middlewares')
const { INDEXES, ElasticSearchService } = require('./elasticsearch')
const router = require('./routes')

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const swaggerUI = require('swagger-ui-express')
  const docs = require('../swagger-docs')

  app.use('/swagger-ui/', swaggerUI.serve, swaggerUI.setup(docs))
}

const elasticSearchService = new ElasticSearchService()
elasticSearchService.createIndex(INDEXES.todos.name, INDEXES.todos.mappingProperties)
  .catch(e => console.log(`Error creating index ${INDEXES.todos.name}:`, e))

app.use(requestLogger)
app.use('/api/v1/', router)

app.use(expressErrorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.info(`Server started on port: ${PORT}`)
})
