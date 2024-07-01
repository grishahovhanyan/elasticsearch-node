const { Router } = require('express')

const configRouter = require('./config')
const todoRouter = require('./todo.route')

const router = Router()

router.use(configRouter)
router.use(todoRouter)

// ***** Healthcheck
router.get('/healthcheck/', (req, res) => {
  res.send('Ok')
})


module.exports = router
