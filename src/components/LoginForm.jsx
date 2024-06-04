export function LoginForm({ user, username, setUsername, password, setPassword, handleLogin }) {
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