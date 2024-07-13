import { useSelector, useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Blogs({ children }) {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  const blogStyle = {
    padding: '10px 8px',
    border: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  }

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  if (user !== null)
    return (
      <div>
        {children}
        <br />
        {sortedBlogs.map(blog => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    )
}
