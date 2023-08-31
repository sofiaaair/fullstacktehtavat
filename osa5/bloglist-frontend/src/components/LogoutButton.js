const LogoutButton = ({ setUser, setLoggeduser }) => {
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    setLoggeduser(null)
  }

  return (
    <button
      onClick={() => {
        logout()
      }}
    >
      Logout
    </button>
  )
}

export default LogoutButton
