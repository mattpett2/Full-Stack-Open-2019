require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('data', function (req, res) { 
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    } 
})
app.use(morgan(':method :url :status :response-time ms :data'))

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: "39-44-5323523",
        id: 2
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<h2>Welcome to phonebook!</h2>')
  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(pers => pers.toJSON()))
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(pers => {
    if (pers) {
      response.json(pers.toJSON())
    } else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))
})

app.get('/info', (req,res) => {
    Person.find({}).then(persons => {
    const numPersons = persons.length
    const timestamp = Date()
    res.send(
    `<div><p>Phonebook has info for ${numPersons} people</p><p>${timestamp}</p></div>`)
    });
    
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

const generateId = () => {
    randInt = Math.floor(Math.random() * 50000)
    while (persons.find(pers => pers.id === randInt)){
        randInt = Math.floor(Math.random() * 50000)
    }
    return(randInt)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    if (persons.find(pers => pers.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = new Person ({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    console.log('put request')
    const body = request.body

    const person = {
      name: body.name,
      number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { number: person.number })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))

})

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})