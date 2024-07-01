class BadRequestException extends Error {
  constructor(data) {
    super(data?.message)
    this.status = 400
    for (let key in data) {
      this[key] = data[key]
    }
  }
}

module.exports = { BadRequestException }
