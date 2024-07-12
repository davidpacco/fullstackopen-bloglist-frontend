import { Blog } from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import { logout } from '../reducers/userReducer'
import { useEffect } from 'react'

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
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
}
