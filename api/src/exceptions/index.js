module.exports = {
  ...require('./bad-request.exception'),
  ...require('./forbidden.exception'),
  ...require('./not-found.exception'),
  ...require('./unauthorized.exception')
}