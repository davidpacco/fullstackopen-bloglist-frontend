import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export function User() {
  const { id } = useParams()
  const user = useSelector(({ users }) => {
    return users.find(user => user.id === id)
  })

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Added blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
