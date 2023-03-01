import { useState, useEffect } from 'react'
import personService from './services/persons'
import Name from'./components/Name'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import './index.css'




const App = () => {
  const [message, setMessage] = useState(null)
  const [errormessage, setErrormessage] = useState(null)
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect (() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })

  }, [])

  const Notification = ({message}) => {
    
    if (message === null && errormessage === null) {
      return null
    }

    

    if (errormessage !== null && message === null){
      return(
      <div className = "error">
        {errormessage}
      </div>
      )
    }

    return (
      <div className = "notification">
        {message}
      </div>
    )
  }
  


  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  
  const sortPeople = () => {
    const people = persons.filter( person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    return(
      people.map(item =>
        <div key = {item.name}>
        < Name key = {item.name} name = {item.name} number = {item.number}/>
        <button onClick={() => {
          confirmDeletion(item.id, item.name)
        }}>delete</button>
        </div>
    )
    )
  }


  const confirmDeletion = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      personService
      .deletion(id)
  
      setPersons(persons.filter(item => item.id !== id))
      
    }
  }
  


  const replaceName = (nameObject) => {
    const person = persons.find(person => person.name === nameObject.name)
    personService
    .replacement(nameObject, person.id)
    .then(response => {
      setPersons(persons.map(person => person.id !== response.id ? person : response))
    })
    .catch(error => {
      setErrormessage(`${nameObject.name} is already removed from phonebook`)
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    })
    
    setNewName('')
    setNewNumber('')
    setPersons(persons.filter(n => n.id !== person.id))
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }

    const found = persons.find(item =>
      item.name === newName)
    
    if (found !==undefined ) {
      if (window.confirm(`${nameObject.name} is already added to phonebook. Do you want to replace old number with new one?`)){
        replaceName(nameObject)
      }
    }
    else {
      personService
        .create(nameObject)
        .then(response =>{
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        setMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setMessage(null)
        },5000 )
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <Filter filter = {newFilter} change = {handleFilterChange}/>
      <h2>Add a new name</h2>
      {<PersonForm submitValue={addName} 
        input1 = {newName} 
        onChange1={handleNameChange} 
        input2={newNumber} 
        onChange2 = {handleNumberChange}/>}
      <h2>Numbers</h2>
      {sortPeople()}
     
      

    </div>
  )

}

export default App
