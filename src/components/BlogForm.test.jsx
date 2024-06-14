import { render, screen } from '@testing-library/react'
import { BlogForm } from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('form calls the event handler with the right details', async () => {
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const title = screen.getByPlaceholderText('Enter the blog title')
    const author = screen.getByPlaceholderText('Enter the author\'s name')
    const url = screen.getByPlaceholderText('Enter the URL')
    const button = screen.getByText('Create')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'test.com')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('test.com')
  })
})