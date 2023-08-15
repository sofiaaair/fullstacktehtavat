import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
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

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.children}
        <Button id="cancelButton" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Button id="submitButton" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
