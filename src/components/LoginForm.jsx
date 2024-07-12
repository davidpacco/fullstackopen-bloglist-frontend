import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

export function LoginForm() {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()

    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
  }

  if (user === null)
    return (
      <div>
        <h2>Log in to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              data-testid="username"
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              data-testid="password"
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    )
}
