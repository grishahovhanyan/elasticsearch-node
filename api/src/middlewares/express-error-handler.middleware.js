/* eslint-disable no-unused-vars */
function expressErrorHandler(err, req, res, next) {
  const { status, ...rest } = err
  return res.status(status || 500).json(rest)
}

module.exports = { expressErrorHandler }
