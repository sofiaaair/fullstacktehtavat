const Notification = ({ message, errormessage }) => {

  if (message === null && errormessage === null) {
    return null
  }



  if (errormessage !== null && message === null){
    return(
      <div className = "error">
        {errormessage}
      </div>
    )
  }

  return (
    <div className = "notification">
      {message}
    </div>
  )
}

export default Notification