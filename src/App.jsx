import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { initialUser } from './reducers/userReducer'
import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import './index.css'

function App() {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  return (
    <div>
      <Notification />

      <LoginForm />

      <Blogs>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </Blogs>
    </div>
  )
}

export default App
