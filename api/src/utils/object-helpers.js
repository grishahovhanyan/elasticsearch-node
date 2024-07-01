function parseJSON(value) {
  try {
    const parsedValue = JSON.parse(value)
    return parsedValue
  } catch {
    return null
  }
}

function getPagesForResponse(countOfInstances, perPage, page) {
  const numPages = Math.ceil(countOfInstances / perPage)

  return {
    next: (page + 1 > numPages) ? null : page + 1,
    previous: (page - 1) < 1 ? null : page - 1,
    current: page,
    numPages,
    perPage
  }
}

module.exports = {
  parseJSON,
  getPagesForResponse
}
