import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

export function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const style = { margin: 8 }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/" style={style}>
        Blogs
      </Link>
      <Link to="/users" style={style}>
        Users
      </Link>
      <span style={style}>{user?.name} logged in</span>
      <button onClick={handleLogout} style={style}>
        Logout
      </button>
    </nav>
  )
}
