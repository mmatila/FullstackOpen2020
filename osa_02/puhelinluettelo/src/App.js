import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/personService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => { setPersons(persons) })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const Person = {
      name: newName,
      number: newNumber
    }

    const personExists = (persons, name) => {
      return (persons.map(person => person.name).includes(name))
    }

    if (personExists(persons, newName)) {
      if (window.confirm(`${newName} is already added. Click 'OK' to update number`)) {
        const changingPerson = persons.find(p => p.name === newName)
        const changedPerson = {...changingPerson, number: newNumber}

        personService
          .update(changingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changingPerson.id ? person : returnedPerson))
            setSuccessMessage(
              `Number updated successfully!`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(
              `An error occurred updating number. Try refreshing the page`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2500)
          })
      }
      
    } else {
      personService
        .create(Person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(
            `Person ${Person.name} was added to the phonebook!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => { setNewName(event.target.value) }

  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  const ignoreCase = (person) => (
    person.name.toUpperCase()
      .includes(newFilter.toUpperCase())
  )

  const removePerson = (deletedPerson) => {
    if (window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)) {
      personService
        .remove(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setSuccessMessage(
            `Person removed successfully!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        })
        .catch(error => {
          console.log('Failed')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        nameHandler={handleNameChange}
        name={newName}
        numberHandler={handleNumberChange}
        number={newNumber}
        personAdd={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} ignore={ignoreCase} removePerson={removePerson} />
      <ErrorNotification message={errorMessage}/>
    </div>
  )
}

export default App
