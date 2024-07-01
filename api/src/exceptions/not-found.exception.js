const { ERROR_MESSAGES } = require('../utils/messages')

class NotFoundException extends Error {
  constructor(data) {
    super(data?.message)
    this.detail = data?.detail || ERROR_MESSAGES.notFound404
    this.status = 404
    for (let key in data) {
      this[key] = data[key]
    }
  }
}

module.exports = { NotFoundException }
