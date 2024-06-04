import { Blog } from './Blog'

export function Blogs({ user, blogs, handleLogout }) {
  if (user !== null) return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}