import { useSelector, useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export function Blogs({ children }) {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  if (user !== null)
    return (
      <div>
        {children}
        <br />
        <Table striped bordered hover>
          <tbody>
            {sortedBlogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
}
