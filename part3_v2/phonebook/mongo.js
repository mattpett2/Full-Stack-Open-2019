const mongoose = require('mongoose')

const password = process.argv[2]
if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }


const url =
  `mongodb+srv://fullstack:${password}@cluster0-sxl8i.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if ( process.argv.length===3 ) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
      })
  }

person.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
})