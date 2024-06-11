import { useState } from "react"

export function LoginForm({ user, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()

    await onLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  if (user === null) return (
    <div>
      <h2>Log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button>login</button>
      </form>
    </div>
  )
}