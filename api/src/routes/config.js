const express = require('express')

const configRouter = express.Router()

configRouter.use(express.json())
configRouter.use(express.urlencoded({ extended: true }))

module.exports = configRouter
