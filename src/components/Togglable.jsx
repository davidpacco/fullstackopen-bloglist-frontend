import { useState, forwardRef, useImperativeHandle } from 'react'

export const Togglable = forwardRef(function Togglable({ buttonLabel, children }, ref) {
  const [isVisible, setIsVisible] = useState(false)
  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
