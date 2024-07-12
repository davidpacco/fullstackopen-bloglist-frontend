import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotification } from './reducers/notificationReducer'
import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

function App() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const userInLocalStorage = JSON.parse(
      window.localStorage.getItem('BloglistAppUser')
    )
    if (userInLocalStorage) {
      setUser(userInLocalStorage)
      blogService.setToken(userInLocalStorage.token)
    }
  }, [])

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('BloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      dispatch(errorNotification('Wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <Notification />

      <LoginForm user={user} onLogin={handleLogin} />

      <Blogs user={user} handleLogout={handleLogout}>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm user={user} blogFormRef={blogFormRef} />
        </Togglable>
      </Blogs>
    </div>
  )
}

export default App
