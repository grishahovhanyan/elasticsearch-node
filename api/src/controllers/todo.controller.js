const { SUCCESS_RESPONSE } = require('../utils/messages')
const { getPagesForResponse } = require('../utils/object-helpers')
const { INDEXES, ElasticSearchService } = require('../elasticsearch')

const INDEX_TODOS = INDEXES.todos.name
const elasticSearchService = new ElasticSearchService()

class TodoController {
  async index(req, res) {
    const { page, perPage, s: searchText, completed, userIds } = req.query

    const searchInput = {
      page: !isNaN(+page) ? +page : 1,
      perPage: !isNaN(+perPage) ? +perPage : 50,
      searchText,
      completed: completed ? completed === 'true' : undefined,
      userIds: userIds ? userIds.split(',') : undefined
    }
    const { items: todos, count } = await elasticSearchService.search(INDEX_TODOS, searchInput)

    res.json({
      pages: getPagesForResponse(count, searchInput.perPage, searchInput.page),
      count: todos.length,
      results: todos
    })
  }

  async create(req, res) {
    const { userId, title, completed } = req.body

    const todo = { userId, title, completed }
    await elasticSearchService.indexDocument(INDEX_TODOS, todo)

    res.json(todo)
  }

  async find(req, res) {
    const { id: todoId } = req.params

    const todo = await elasticSearchService.getDocument(INDEX_TODOS, todoId)

    res.json(todo)
  }

  async update(req, res) {
    const { id: todoId } = req.params
    const { userId, title, completed } = req.body

    await elasticSearchService.updateDocument(INDEX_TODOS, todoId, { userId, title, completed })

    res.json(SUCCESS_RESPONSE)
  }

  async delete(req, res) {
    const { id: todoId } = req.params

    await elasticSearchService.deleteDocument(INDEX_TODOS, todoId)

    res.json(SUCCESS_RESPONSE)
  }
}

module.exports = TodoController
