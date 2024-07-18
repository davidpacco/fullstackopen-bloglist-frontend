import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

export const Togglable = forwardRef(function Togglable(
  { buttonLabel, children },
  ref
) {
  const [isVisible, setIsVisible] = useState(false)
  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility} variant="outline-danger">
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
