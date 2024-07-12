import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialUser, logout } from './reducers/userReducer'
import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import { Users } from './components/Users'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './index.css'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  const handleLogout = () => dispatch(logout())

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <p>{user?.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Blogs>
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
              </Blogs>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
