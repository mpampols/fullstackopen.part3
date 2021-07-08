require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()

const Person = require('./models/person')

var morgan = require('morgan')
morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})

// Middlewares
app.use(cors())
app.use(express.urlencoded())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)
app.use(express.static('build'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/index', (request, response) => {
  const request_date = new Date()
  Person.find({}).then((persons) => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${request_date}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))

  response.status(204).end()
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }
  const opts = {
    runValidators: true,
    new: true,
    context: 'query',
  }

  Person.findByIdAndUpdate(request.params.id, person, opts)
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Name or number are missing.',
    })
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    id: request.body.id,
  })

  // If a person with the same name already exists. We choose to update the number.
  Person.findById(request.params.id)
    .then((foundPerson) => {
      if (foundPerson) {
        // Name exists, updating...
        const opts = {
          runValidators: true,
          new: true,
          context: 'query',
        }
        Person.findByIdAndUpdate(request.params.id, foundPerson, opts)
          .then((updatedPerson) => {
            response.json(updatedPerson)
          })
          .catch((error) => next(error))
      } else {
        // Name is new, creating...
        person
          .save()
          .then((savedPerson) => {
            return savedPerson.toJSON()
          })
          .then((savedAndFormattedPerson) => {
            response.json(savedAndFormattedPerson)
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

// Middleware: Error handler
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ json: error.message })
  }

  next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
