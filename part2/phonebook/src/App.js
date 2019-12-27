import React, { useState, useEffect } from 'react'
import phoneService from './services/phonebook'
import './styles.css'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import Notification from './components/notification'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)  
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    phoneService.getAll()
    .then(initialNums => {
      setPersons(initialNums)
    })
  }
  
  useEffect(hook, [])  

  const deletePerson = (id, name) => {
    console.log(`delete person ${id}`)
      if (window.confirm(`Delete ${name}?`)){
        phoneService
        .remove(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
        .catch(e => {
          alert('The number was already deleted')
        })
      }
    }

  const addNumber = (event) => {
      event.preventDefault()
      const newEntry = {
          name: newName,
          number: newNumber
      }
      if (persons.filter(person => person.name === newName).length !== 0){
          if(window.confirm(`${newName} is already in phonebook. Would you like 
          to replace the existing number?`)){
            let obj = persons.find(pers => pers.name === newName)
            let id = obj.id;
            phoneService
            .update(id, newEntry)
            .then(returnedEntry => {
              setPersons(persons.map(pers => pers.name !== newName ? pers : returnedEntry))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(`Information of ${newName} has already been deleted`)
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
          return
      }

      phoneService
      .create(newEntry)
      .then(returnedEntry => {
        setPersons(persons.concat(returnedEntry))
        setSuccessMessage(
          `Added ${newEntry.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
  }
 
  const personRows = () => {
    let filteredPersons = persons.filter(
        person => person.name.substring(0, newFilter.length).toLowerCase() ===
        newFilter.toLowerCase())
        return(
            filteredPersons.map(person =><li key={person.name}>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>Delete</button></li>)    
        )        
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
        <Notification.Success message={successMessage} />
        <Notification.Error message={errorMessage} />
        <Filter handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
        <PersonForm handleNameChange={handleNameChange}
         handleNumberChange={handleNumberChange}
         addNumber={addNumber}/>
      <h2>Numbers</h2>
        <Persons personRows={personRows}/>
    </div>
  )
}

export default App