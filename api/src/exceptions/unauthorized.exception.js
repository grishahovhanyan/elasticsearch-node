const { ERROR_MESSAGES } = require('../utils/messages')

class UnauthorizedException extends Error {
  constructor(data) {
    super(data?.message)
    this.detail = data?.detail || ERROR_MESSAGES.unauthorized401
    this.status = 401
    for (let key in data) {
      this[key] = data[key]
    }
  }
}

module.exports = { UnauthorizedException }
