import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button id="submitBlogButton" type="submit">
          Add a new blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
