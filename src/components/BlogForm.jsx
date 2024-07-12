import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

export function BlogForm({ blogFormRef }) {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async e => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }, user))
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user !== null)
    return (
      <div>
        <h2>Create new</h2>

        <form onSubmit={addBlog}>
          <div>
            <label>
              Title:
              <input
                name="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter the blog title"
                data-testid="title"
              />
            </label>
          </div>

          <div>
            <label>
              Author:
              <input
                name="title"
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                data-testid="author"
              />
            </label>
          </div>

          <div>
            <label>
              URL:
              <input
                name="url"
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter the URL"
                data-testid="url"
              />
            </label>
          </div>

          <button>Create</button>
        </form>
      </div>
    )
}
