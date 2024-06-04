import { useState, useEffect } from 'react'
import { Login } from './components/Login'
import { Blogs } from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'


function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('BloglistAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      alert('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistAppUser')
    setUser(null)
  }

  return (
    <div>
      <Login
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
      />
    </div>
  )
}

export default App
