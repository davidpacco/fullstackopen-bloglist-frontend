import { Blog } from './Blog'

export function Blogs({ user, blogs, handleLogout, handleLike, children }) {
  if (user !== null) return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {children}
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} onLike={handleLike} />
      ))}
    </div>
  )
}