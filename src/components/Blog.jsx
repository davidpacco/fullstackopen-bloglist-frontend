import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'

export function Blog() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blog = useSelector(({ blogs }) => {
    return blogs.find(blog => blog.id === id)
  })

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

  const handleDelete = () => {
    const deletionConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (deletionConfirmed) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) return null

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <button onClick={handleDelete}>Remove</button>
      )}
    </div>
  )
}
