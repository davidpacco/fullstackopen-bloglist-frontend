import { useState } from "react"

export function Blog({ blog, onLike }) {
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

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={toggleDetail}>{isDetailOpen ? 'Hide' : 'View'}</button>
      {isDetailOpen &&
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes} <button onClick={handleLike}>Like</button></p>
          <p>{blog.user.name}</p>
        </div>
      }
    </div>
  )
}