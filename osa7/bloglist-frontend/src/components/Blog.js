import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Blog = ({ blog }) => {


  const BlogStyle = styled.div`
    display:flex;
    margin: 0.5rem;
    padding: 1rem;
    background: #e0f2df;
    border-top: 1px solid #ddd;
  `
  const LinkStyle = styled.div`
    padding: 0.25rem 0.5rem;
    background: papayawhip;
    border-top: 1px solid #ddd;
  `

  const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`


  return (
    <div className="blogTitles">
      {
        <BlogStyle>
          <LinkStyle>
            <StyledLink to={`/blog/${blog.id}`}>{blog.title}</StyledLink>
          </LinkStyle>
        </BlogStyle>
      }
    </div>
  )
}
Blog.propTypes = {
  blog: propTypes.object.isRequired
}

export default Blog
