import { useState } from "react"

export function BlogForm({ user, createBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async e => {
    e.preventDefault()

    await createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user !== null) return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              name='title'
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Author:
            <input
              name='title'
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            URL:
            <input
              name='url'
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </label>
        </div>

        <button>Create</button>
      </form>
    </div>
  )
}