import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

export function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user?.name} logged in{' '}
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
