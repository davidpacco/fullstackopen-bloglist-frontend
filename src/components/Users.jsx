import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initialUsers } from '../reducers/usersReducer'
import Table from 'react-bootstrap/Table'

export function Users() {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initialUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
