require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')
const app = express()
morgan.token('reqBody', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :req[Content-Length] - :response-time ms :reqBody'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    name: 'Arto Hellas',
    number: '0401234567',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '0407654321',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '0409837467',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '0407238943',
    id: 4
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  const date = Date()

  Person.find({})
    .then(persons => {
      response.send(`<p>Phonebook has information for <b>${persons.length}</b> people</p><p>${date}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const id = Math.floor(Math.random() * 100000)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Fields name and number cannot be empty'
    })
  } else if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'Name already exists'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: id
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})