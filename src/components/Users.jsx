import { useState, useEffect } from 'react'
import userService from '../services/users'

export function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
