import { useParams, Link, useNavigate } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'


const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`
const Wrapper = styled.section`
  margin: 2em;
  padding: 4em;
  background: #C7EBDF;
  border: 2px solid #005A3D;
  border-radius: 3px
`
const ItemWrapper = styled.section`
  padding: 4em;
  background: white;
  border: 0.5px solid #005A3D;
`
const Section = styled.section`
  background: #e0f2df;
  border-top: 1px solid #ddd;
`
const SingleUserView = ({ blogs }) => {

  const { user } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!Object.keys(blogs).includes(user)){
      navigate('/')
    }
  })


  if (Object.keys(blogs).includes(user)) {return(
    <div>
      <Wrapper>
        <ItemWrapper>
          <h1>{user}</h1>
          <h5>Added blogs:</h5>
          <Section>
            <ul>
              {blogs[user].map(blog => (
                <li key ={blog}>
                  <Section>
                    {blog}
                  </Section>
                </li>
              ))
              }
            </ul>
          </Section>
          <StyledLink to='/'>Back to front page</StyledLink>
        </ItemWrapper>
      </Wrapper>
    </div>
  )} else{
    return null
  }
}

export default SingleUserView