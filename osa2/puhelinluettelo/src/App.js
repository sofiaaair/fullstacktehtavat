import { useState } from 'react'
import Name from'./components/Name'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
        < Name key = {item.name} name = {item.name} number = {item.number}/>)
    )
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
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
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
