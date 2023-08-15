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
const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <Wrapper>
        <FormWrapper>
          <Title>Login</Title>
          <form onSubmit={handleLogin}>
            <div>
          username
              <Input
                type="text"
                value={username}
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
          password
              <Input
                type="password"
                value={password}
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button type="submit">
          login
            </Button>
          </form>
        </FormWrapper>
      </Wrapper>
    </div>
  )
}

export default Login
