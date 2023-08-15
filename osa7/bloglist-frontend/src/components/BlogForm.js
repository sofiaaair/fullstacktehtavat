import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: #005A3D;
  font-size: 1em;
  color: white;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #01402b;
  border-radius: 3px
`
const Input = styled.input`
  margin: 0.25em;
  color: #005A3D;
  border-color: #005A3D;

`
const Title = styled.h1`
  font-size: 1.6em;
  color: #005A3D;
`
const Wrapper = styled.section`
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
      <Wrapper>
        <Title>Add new blog</Title>
        <FormWrapper>
          <form onSubmit={addBlog}>
            <div>
          Title:
              <Input
                type="text"
                value={title}
                id="title"
                onChange={({ target }) => setTitle(target.value)}
                placeholder="write title here"
              />
            </div>
            <div>
          Author:
              <Input
                type="text"
                value={author}
                id="author"
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="write author here"
              />
            </div>
            <div>
          Url:
              <Input
                type="text"
                value={url}
                id="url"
                onChange={({ target }) => setUrl(target.value)}
                placeholder="write url here"
              />
            </div>
            <Button id="submitBlogButton" type="submit">
          Add a new blog
            </Button>
          </form>
        </FormWrapper>
      </Wrapper>
    </div>
  )
}

export default BlogForm
