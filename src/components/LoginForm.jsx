import { useSelector, useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export function LoginForm() {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const handleLogin = async e => {
    e.preventDefault()
    const { username, password } = Object.fromEntries(new FormData(e.target))

    dispatch(login({ username, password }))
    e.target.reset()
  }

  if (user === null)
    return (
      <div>
        <h2>Log in to app</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    )
}
