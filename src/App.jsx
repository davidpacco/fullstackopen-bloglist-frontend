import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  successNotification,
  errorNotification,
} from './reducers/notificationReducer'
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
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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

  const handleLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.likeBlog(id, blogObject)
      setBlogs(
        blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (e) {
      dispatch(errorNotification('Cannot like blog, try again later'))
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.removeBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (e) {
      dispatch(errorNotification('Cannot delete blog'))
    }
  }

  return (
    <div>
      <Notification />

      <LoginForm user={user} onLogin={handleLogin} />

      <Blogs
        user={user}
        blogs={sortedBlogs}
        handleLogout={handleLogout}
        handleLike={handleLike}
        removeBlog={removeBlog}
      >
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm user={user} blogFormRef={blogFormRef} />
        </Togglable>
      </Blogs>
    </div>
  )
}

export default App
