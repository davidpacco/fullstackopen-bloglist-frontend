import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

export function Blog({ blog }) {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const blogStyle = {
    padding: '10px 8px',
    border: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  }

  const toggleDetail = () => setIsDetailOpen(!isDetailOpen)

  const handleLike = () => {
    dispatch(
      likeBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user.id,
        likes: blog.likes + 1,
      })
    )
  }

  const handleDelete = () => dispatch(deleteBlog(blog))

  return (
    <div style={blogStyle} className="blog">
      {blog.title} - {blog.author}{' '}
      <button onClick={toggleDetail}>{isDetailOpen ? 'Hide' : 'View'}</button>
      <div
        style={{ display: isDetailOpen ? '' : 'none' }}
        className="blogDetail"
      >
        <p>{blog.url}</p>
        <p>
          Likes {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleDelete}>Remove</button>
        )}
      </div>
    </div>
  )
}
