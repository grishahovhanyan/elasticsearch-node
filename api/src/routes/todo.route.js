const { Router } = require('express')
const { useEH } = require('../middlewares')
const TodoController = require('../controllers/todo.controller')

const todoRouter = Router()
const todoController = new TodoController()

todoRouter.get('/todos/', useEH(todoController.index))
todoRouter.post('/todos/', useEH(todoController.create))
todoRouter.get('/todos/:id/', useEH(todoController.find))
todoRouter.put('/todos/:id/', useEH(todoController.update))
todoRouter.delete('/todos/:id/', useEH(todoController.delete))

module.exports = todoRouter
