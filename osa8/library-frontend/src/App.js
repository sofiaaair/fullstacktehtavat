import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import RecommendBooks from './components/RecommendBooks'

const StyledLink = styled(Link)`
display: inline-block;
background-color: #5cafb5;
color: white;
padding: 10px 20px;
text-align: center;
text-decoration: none;
border-radius: 4px;
cursor: pointer;
`



const App = () => {

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return (

      <div>
        <LoginForm setToken={setToken}/>
      </div>
    )
  }

  return (
    <Router>
    <div>
      <div>
        <StyledLink to="/">authors</StyledLink>
        <StyledLink to="/books">books</StyledLink>
        <StyledLink to="/addBook">add book</StyledLink>
        <StyledLink to="/recommendations">recommendations</StyledLink>
        <button onClick={logout}>logout</button>
      </div>

    <Routes>
      <Route path="/" element = {<Authors/>}/>

      <Route path="/books" element= {<Books/>}/>

      <Route path="/addBook" element= {<NewBook/>}/>
      <Route path="/recommendations" element={<RecommendBooks/>}/>
    </Routes>
    </div>
    </Router>
  )
}

export default App
