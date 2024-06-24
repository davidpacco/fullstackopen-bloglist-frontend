import { Blog } from './Blog'

export function Blogs({ user, blogs, handleLogout, handleLike, removeBlog, children }) {
  if (user !== null) return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
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