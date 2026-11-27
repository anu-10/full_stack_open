require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

morgan.token('post', (request) => (
  request.method === 'POST' ? JSON.stringify(request.body) : ''
))

app.use(cors())
app.use(express.static('frontend'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({ error: 'name and number are required' })
    }

    const person = await new Person({ name, number }).save()
    response.status(201).json(person)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (!person) return response.status(404).end()
    response.json(person)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const { name, number } = request.body
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedPerson) return response.status(404).end()
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findByIdAndDelete(request.params.id)
    if (!person) return response.status(404).end()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (request, response, next) => {
  try {
    const count = await Person.countDocuments({})
    response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
  } catch (error) {
    next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
})

app.use((error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.code === 11000) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  response.status(500).json({ error: 'Internal server error' })
})

const start = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  await mongoose.connect(uri)
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

start().catch((error) => {
  console.error('Unable to start server:', error.message)
  process.exit(1)
})
