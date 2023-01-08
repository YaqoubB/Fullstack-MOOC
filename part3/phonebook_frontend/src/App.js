

import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import numberService from './services/numbers'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState([null, true])

  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])


  const personsToShow = (newFilter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const find = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (find !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        numberService
          .update(find.id, personObject)
          .then(returnedNumber => {
            setPersons(persons.map(person => person.id !== find.id ? person : returnedNumber))
          })
          .then(success => {
            setMessage([`${newName}'s number was changed`, true])
            setTimeout(() => { setMessage([null, true]) }, 5000)
          })
          .catch(error => {
            if (error.response.data.type === "ValidationError") {
              setMessage([`${error.response.data.error}`, false])
            }
            else {
              setMessage([`Information of ${newName} has already been removed from the server`, false])
              setPersons(persons.filter(person => person.id !== find.id))
            }
            setTimeout(() => { setMessage([null, true]) }, 5000)
          })
      }
    }
    else {
      numberService
        .create(personObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
        })
        .then(success => {
          setMessage([`Added ${newName}`, true])
          setTimeout(() => { setMessage([null, true]) }, 5000)
        })
        .catch(error => {
          setMessage([`${error.response.data.error}`, false])
          setTimeout(() => { setMessage([null, true]) }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }


  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDeleteNumber = (event) => {
    const name = persons.find(person => person.id === event.target.id).name

    if (window.confirm(`Delete ${name} ?`)) {
      return (
        numberService
          .deleteNumber(event.target.id)
          .then(returnedNumber => {
            setPersons(persons.filter(person => person.id !== event.target.id))
          }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDeleteNumber={handleDeleteNumber} />
    </div>
  )
}



export default App