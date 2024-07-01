const { ERROR_MESSAGES } = require('../utils/messages')

class ForbiddenException extends Error {
  constructor(data) {
    super(data?.message)
    this.detail = data?.detail || ERROR_MESSAGES.forbidden403
    this.status = 403
    for (let key in data) {
      this[key] = data[key]
    }
  }
}

module.exports = { ForbiddenException }
