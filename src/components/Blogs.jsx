import { Blog } from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'

export function Blogs({
  user,
  handleLogout,
  handleLike,
  removeBlog,
  children,
}) {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

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
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            deleteBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    )
}
