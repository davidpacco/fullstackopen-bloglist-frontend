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

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      alert('wrong credentials')
    }
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
      />
    </div>
  )
}

export default App
