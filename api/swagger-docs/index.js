module.exports = {
  ...require('./basic-options'),
  ...require('./servers'),
  ...require('./components'),
  paths: {
    ...require('./todos')
  }
}
