import { useState, useEffect, useRef } from 'react'
import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const userInLocalStorage = JSON.parse(window.localStorage.getItem('BloglistAppUser'))
    if (userInLocalStorage) {
      setUser(userInLocalStorage)
      blogService.setToken(userInLocalStorage.token)
    }
  }, [])

  const createBlog = async e => {
    e.preventDefault()

    try {
      const blog = await blogService.addBlog({ title, author, url })
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({ type: 'success', text: `${blog.title} by ${blog.author} added` })
      setTimeout(() => setMessage(null), 5000)
    } catch (e) {
      setMessage({ type: 'error', text: 'Unable to create blog' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('BloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage({ type: 'error', text: 'Wrong username or password' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} />

      <LoginForm
        user={user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />

      <Blogs
        user={user}
        blogs={blogs}
        handleLogout={handleLogout}
      >
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            user={user}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            createBlog={createBlog}
          />
        </Togglable>
      </Blogs>

    </div>
  )
}

export default App
