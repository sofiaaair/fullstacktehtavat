import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import blogServige from '../services/blogs'
import { setUpdate } from '../reducers/updateReducer'
import { setError, clearError } from '../reducers/errorReducer'
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

const Title = styled.h1`
  font-size: 1.6em;
  color: #005A3D;
`
const BackroundWrapper = styled.section`
  margin: 2em;
  padding: 4em;
  background: #C7EBDF;
  border: 2px solid #005A3D;
  border-radius: 3px
`
const Wrapper = styled.section`
  padding: 4em;
  background: white;
  border: 0.5px solid #005A3D;
`

const BlogStyle = styled.div`
margin: 2em;
padding: 4em;
background: #C7EBDF;
border: 2px solid #005A3D;
border-radius: 3px

`
const ItemStyle = styled.div`
flex: 0 0 auto;
padding: 0.25rem 0.5rem;
background: papayawhip;
border-top: 1px solid #ddd;
`
const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`
const BoxStyle = styled.div`
  color: brown;
  border: 1px solid;
  display: block;
`
const Section = styled.section`
  background: #e0f2df;
  border-top: 1px solid #ddd;
`


const BlogView =  ( { updateBlog, removeBlog } ) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog } = useParams()
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')


  const blogToReturn = blogs.find(item => item.id === blog)

  useEffect(() => {
    blogServige
      .getComments(blog)
      .then(comment => setComments(comment))
  }, [comments])


  const sendComment = (event) => {
    event.preventDefault()

    if (!comment){
      dispatch(setError('Comment section is empty'))
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    } else {
      try{
        blogServige.setToken(user.user.token)
        blogServige.setComment({ id : blog, comment: comment })

      }catch(exception){
        console.log(exception)

      }
    }
    dispatch(setUpdate(['comment']))
    setComment('')
  }

  const blogUpdate = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blogToReturn,
      likes: blogToReturn.likes+1
    }
    updateBlog(updatedBlog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blogToReturn)
    navigate('/')
  }

  if(blogToReturn){
    return(
      <div>
        <BackroundWrapper>
          <Wrapper>
            <BlogStyle>
              <ItemStyle>
                <Title>{blogToReturn.title}</Title>
                <p>Url:
                  <BoxStyle>
                    {blogToReturn.url}
                  </BoxStyle>
                </p>
                <p>Added by: {blogToReturn.user.name}</p>
                <p>Likes:</p>
                {blogToReturn.likes}


                <Button id="likeButton" onClick={blogUpdate}>
                Like Blog
                </Button>
              </ItemStyle>
              <ItemStyle>
                {user.user.name === blogToReturn.user.name && (
                  <Button id="deleteButton" onClick={deleteBlog}>
              Delete Blog
                  </Button>
                )}
              </ItemStyle>

            </BlogStyle>

            <BlogStyle>
              <p>Comments:</p>

              {comments.map((comment) => (
                // eslint-disable-next-line react/jsx-key
                <Section>
                  <li key={comment.id}>
                    {comment.comment}
                  </li>
                </Section>
              )
              )}
              <form onSubmit={sendComment}>

                <input type= "text" name='commentSection'
                  onChange={({ target }) => setComment(target.value)}/>
                <Button type='submit'>Send</Button>

              </form>


              <StyledLink to='/'>Back to front page</StyledLink>
            </BlogStyle>
          </Wrapper>
        </BackroundWrapper>
      </div>
    )
  }


}


export default BlogView