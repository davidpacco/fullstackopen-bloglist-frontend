import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function User() {
  const { id } = useParams()
  const user = useSelector(({ users }) => {
    return users.find(user => user.id === id)
  })

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
