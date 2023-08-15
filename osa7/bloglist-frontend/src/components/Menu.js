import { useDispatch, useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'
import { nullUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { setUpdate } from '../reducers/updateReducer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Page = styled.div`
  padding: 1em;
`
const Navigation = styled.div`
  display: flex;
  background: #C7EBDF;
  font-size: 1em;
  color: white;
  margin: 1em;
  padding: 1em;
  border: 0.5px solid #005A3D;

`
const LinkWrapper = styled.section`
    display:flex;
    margin: 0.5rem;
    padding: 1rem;
    background: #e0f2df;
    border-top: 1px solid #ddd;
`
const TextWrapper = styled.section`
padding: 0.25rem 0.5rem;
background: papayawhip;
border-top: 1px solid #ddd;
`
const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`

const Menu = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(nullUser())
    dispatch(setUpdate(['logout']))
    navigate('/')
  }


  if (user.user !== null) {

    return(
      <div>
        <Page>
          <Navigation>
            <LinkWrapper>
              <TextWrapper>
                <StyledLink to="/">Home</StyledLink>
              </TextWrapper>
            </LinkWrapper>
            <LinkWrapper>
              <TextWrapper>
                <StyledLink to="/users">Users</StyledLink>
              </TextWrapper>
            </LinkWrapper>

            <div>
              {user.logininfo}
              <LogoutButton setUser={handleLogout} />
            </div>
          </Navigation>
        </Page>
      </div>


    )
  }

}

export default Menu