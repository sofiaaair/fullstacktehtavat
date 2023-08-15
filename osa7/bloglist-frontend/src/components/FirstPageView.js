import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Toggable'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUpdate } from '../reducers/updateReducer'
import { clearNotification, addingMessage } from '../reducers/notificationReducer'
import { addingError, clearError } from '../reducers/errorReducer'
import { createBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.6em;
  color: #005A3D;
`
const Wrapper = styled.section`
  margin: 2em;
  padding: 4em;
  background: #C7EBDF;
  border: 2px solid #005A3D;
  border-radius: 3px
`
const FormWrapper = styled.section`
  padding: 4em;
  background: white;
  border: 0.5px solid #005A3D;
`



const FirstPageView = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

  const blogFormRef = useRef()
  const dispatch = useDispatch()





  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.user.token)
      const blog = await blogService.create(blogObject)
      dispatch(createBlog(blog))
      dispatch(setUpdate(['add']))
      blogFormRef.current.toggleVisibility()
      dispatch(addingMessage(`${blog.title}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      dispatch(addingError())
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }







  if( user) return (
    <div>
      <Wrapper>
        <FormWrapper>
          <Title>Blogs</Title>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user.user.name}
            />
          )
          )}
          <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </FormWrapper>
      </Wrapper>
    </div>
  )
  if(!user) return(
    <div>
    </div>
  )


}
export default FirstPageView