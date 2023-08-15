import { setLoginInfo } from '../reducers/userReducer'
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

const LogoutButton = ({ setUser }) => {
  const logout = () => {
    window.localStorage.clear()
    setUser()
    setLoginInfo(null)
  }

  return (
    <Button
      onClick={() => {
        logout()
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
