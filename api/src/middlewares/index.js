module.exports = {
  ...require('./default-error-handler.middleware'),
  ...require('./express-error-handler.middleware'),
  ...require('./request-logger.middleware')
}