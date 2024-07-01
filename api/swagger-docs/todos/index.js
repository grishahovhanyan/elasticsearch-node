module.exports = {
  '/todos/': {
    ...require('./todos-index'),
    ...require('./todos-create')
  },
  '/todos/{id}/': {
    ...require('./todos-find'),
    ...require('./todos-update'),
    ...require('./todos-delete')
  },
}
