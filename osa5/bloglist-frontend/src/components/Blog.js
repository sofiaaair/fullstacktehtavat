import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLike = (event) => {
    event.preventDefault()
    const likes = blog.likes + 1

    updateBlog({
      id: blog.id,
      user: blog.user,
      likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }
  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 0,
    borderLeft: '6px solid',
    borderColor: 'peru',
    borderWith: 1,
    marginBottom: 5,
    backgroundColor: 'oldlace',
  }

  const listStyle = {
    listStyleType: 'none',
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 10,
  }

  return (
    <div className="blogTitles">
      {!visible && (
        <div style={blogStyle}>
          {' '}
          {blog.title}
          <button onClick={toggleVisibility}>show</button>
        </div>
      )}
      {visible && (
        <div style={blogStyle}>
          <ul style={listStyle} className="bloglist">
            <li id="listTitle">
              {blog.title}
              <button onClick={toggleVisibility}>hide</button>{' '}
            </li>
            <li id="listUrl">{blog.url}</li>
            <li id="listLikes">
              {blog.likes}{' '}
              <button id="likeButton" onClick={updateLike}>
                like
              </button>
            </li>
            <li id="listAuthor">
              <b>{blog.author}</b>
            </li>
            <li id="listUser">{blog.user.name}</li>
          </ul>
          {user === blog.user.name && (
            <button id="deleteButton" onClick={deleteBlog}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}
Blog.propTypes = {
  blog: propTypes.object.isRequired,
  updateBlog: propTypes.func.isRequired,
  user: propTypes.string.isRequired,
  removeBlog: propTypes.func.isRequired,
}

export default Blog
