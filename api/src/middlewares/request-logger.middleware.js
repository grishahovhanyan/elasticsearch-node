function requestLogger(req, res, next) {
  const originalJson = res.json
  res.json = function(body) {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Request Path:', req.url, '| Response Code:', res.statusCode)
    }

    originalJson.call(this, body)
  }

  next()
}

module.exports = { requestLogger } 
