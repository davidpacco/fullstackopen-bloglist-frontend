import { useState } from 'react'

export function Blog({ blog, onLike, user, deleteBlog }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const blogStyle = {
    padding: '10px 8px',
    border: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8
  }

  const toggleDetail = () => setIsDetailOpen(!isDetailOpen)

  const handleLike = async () => {
    await onLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const removeBlog = () => {
    const deletionConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (deletionConfirmed) deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={toggleDetail}>{isDetailOpen ? 'Hide' : 'View'}</button>
      {isDetailOpen &&
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes} <button onClick={handleLike}>Like</button></p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && <button onClick={removeBlog}>Remove</button>}
        </div>
      }
    </div>
  )
}