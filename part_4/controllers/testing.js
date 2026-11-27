const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Promise.all([
    Blog.deleteMany({}),
    User.deleteMany({})
  ])

  response.status(204).end()
})

module.exports = testingRouter
