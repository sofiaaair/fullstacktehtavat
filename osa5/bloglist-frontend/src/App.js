import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LogoutButton from './components/LogoutButton'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [update, setUpdate] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loggeduser, setLoggeduser] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogitem) => setBlogs(blogitem.sort((a, b) => b.likes - a.likes)))
  }, [update])

  useEffect(() => {
    const loggedUSerJSON = window.localStorage.getItem('loggedUser')
    if (loggedUSerJSON) {
      const user = JSON.parse(loggedUSerJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setLoggeduser(`${user.name} logged in`)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setUpdate(['add'])
      blogFormRef.current.toggleVisibility()
      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error while creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      setUpdate(['update'])
    } catch (exception) {
      setErrorMessage('Error: like was not saved')
      setTimeout(() => {
        setErrorMessage(null)
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
        blogService.setToken(user.token)
        await blogService.remove(blogObject)
        setMessage(`${blogObject.title} by ${blogObject.author} removed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setUpdate(['remove'])
      } catch (exception) {
        setErrorMessage('Error: Deletion was not completed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} errormessage={errorMessage} />
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }
  return (
    <div>
      <p>{loggeduser}</p>

      <Notification message={message} errormessage={errorMessage} />

      <LogoutButton setUser={setUser} setLoggeduser={setLoggeduser} />

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          user={user.name}
          removeBlog={removeBlog}
        />
      ))}
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
