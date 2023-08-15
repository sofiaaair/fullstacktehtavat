import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'

import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogLike } from './reducers/blogReducer'
import { likeError } from './reducers/errorReducer'

import { removingMessage, clearNotification } from './reducers/notificationReducer'
import { clearError, loginError, deletingError } from './reducers/errorReducer'
import { setBlogs, deleteBlog  } from './reducers/blogReducer'
import { setUpdate } from './reducers/updateReducer'
import { setUser, setUsername, setPassword, setLoginInfo } from './reducers/userReducer'
import FirstPageView from './components/FirstPageView'
import SingleUserView from './components/SingleUserView'
import BlogView from './components/BlogView'
import AllUsersView from './components/AllUsersView'
import Menu from './components/Menu'








const App = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const [usersAndBlogs, setUsersAndBlogs] = useState({})
  const notification = useSelector((state) => state.notification)
  const error = useSelector((state) => state.error)
  const update = useSelector((state => state.update))


  useEffect(() => {
    blogService
      .getAll()
      .then(blogitem => dispatch(setBlogs(blogitem.sort((a, b) => b.likes - a.likes))))
  }, [update])

  useEffect(() => {
    blogService.getAll()
      .then(blogItems => {
        const updatedBlogs = {}
        blogItems.forEach(blog => {
          const usersName = blog.user.name
          if (!updatedBlogs[usersName]) {
            updatedBlogs[usersName] = []
          }
          updatedBlogs[usersName].push(blog.title)
        })
        setUsersAndBlogs(updatedBlogs)
      })
      .catch(error => {
        console.error(error)
      })
  }, [update])

  useEffect(() => {
    const loggedUSerJSON = window.localStorage.getItem('loggedUser')
    if (loggedUSerJSON) {
      const user = JSON.parse(loggedUSerJSON)
      dispatch(setUser(user))
    }
  }, [update])


  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      dispatch(updateBlogLike(updatedBlog.id))
      dispatch(setUpdate(['like']))

    } catch (exception) {
      dispatch(likeError())
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }





  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const username = user.username
      const password= user.password
      const userToLogin = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(userToLogin))
      dispatch(setUser(userToLogin))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(setLoginInfo(`${userToLogin.name} logged in`))
    } catch (exception) {
      dispatch(loginError())
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    if (
      window.confirm(
        `Do you want to remove blog ${blogObject.title} by ${blogObject.author}?`,
      )
    ) {
      try {
        blogService.setToken(user.user.token)
        const blogToRemove = await blogService.remove(blogObject)
        dispatch(deleteBlog(blogToRemove))
        dispatch(removingMessage(`${blogObject.title}`))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
        dispatch(setUpdate(['remove']))
      } catch (exception) {
        dispatch(deletingError())
        setTimeout(() => {
          dispatch(clearError())
        }, 5000)
      }
    }
  }







  const handleUsername = async (username) => {
    dispatch(setUsername(username))
  }

  const handlePassword = async (password) => {
    dispatch(setPassword(password))
  }



  if (user.user === null) {
    return (
      <div>
        <Notification message={notification} errormessage={error} />
        <Login
          handleLogin={handleLogin}
          username={user.username}
          setUsername={handleUsername}
          password={user.password}
          setPassword={handlePassword}
        />
      </div>
    )
  } else{
    return (
      <div>
        <Notification message={notification} errormessage={error} />
        <Menu/>
        <Routes>
          <Route path='/' element={<FirstPageView/>}/>
          <Route path='/user/:user' element= {<SingleUserView blogs = {usersAndBlogs}/>}/>
          <Route path='/users' element={<AllUsersView blogs = {usersAndBlogs}/>}/>
          <Route path ='/blog/:blog' element = {<BlogView updateBlog={updateBlog} removeBlog={removeBlog}/>}/>

        </Routes>
      </div>

    )
  }
}



export default App
