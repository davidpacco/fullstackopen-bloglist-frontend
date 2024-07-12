import { Blog } from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'

export function Blogs({ user, handleLogout, children }) {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  if (user !== null)
    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </p>
        {children}
        <br />
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    )
}
