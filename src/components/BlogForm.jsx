import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export function BlogForm({ blogFormRef }) {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const addBlog = async e => {
    e.preventDefault()
    let { title, author, url } = Object.fromEntries(new FormData(e.target))
    dispatch(createBlog({ title, author, url }, user))
    blogFormRef.current.toggleVisibility()
    e.target.reset()
  }

  if (user !== null)
    return (
      <div>
        <h2>Create new</h2>
        <Form onSubmit={addBlog}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter the blog title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Enter the author's name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              placeholder="Enter then blog URL"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    )
}
