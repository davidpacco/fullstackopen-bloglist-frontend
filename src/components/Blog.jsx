import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, postComment } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

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

  const handleSubmit = e => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(postComment(blog.id, comment))
    e.target.comment.value = ''
  }

  if (!blog) return null

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            {blog.title} - {blog.author}
          </Card.Title>
          <Card.Text>
            <a href={blog.url}>{blog.url}</a>
          </Card.Text>
          <Card.Text>
            {blog.likes} likes{' '}
            <Button variant="primary" onClick={handleLike}>
              Like
            </Button>
          </Card.Text>
          <Card.Text>Added by {blog.user.name}</Card.Text>
          {user.username === blog.user.username && (
            <Button variant="danger" onClick={handleDelete}>
              Remove
            </Button>
          )}
        </Card.Body>
      </Card>

      <h3>Comments</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control type="text" name="comment" />
          <Button variant="outline-primary" type="submit">
            Add comment
          </Button>
        </Form.Group>
      </Form>

      <br />

      <ListGroup>
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
