import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import userEvent from '@testing-library/user-event'

const testBlog = {
  title: 'Test title',
  author: 'Some Author',
  likes: 3,
  url: 'someurl.com',
  user: {
    name: 'Some User',
    username: 'someuser'
  }
}

const testUser = { username: 'someuser' }

describe('<Blog />', () => {
  test('displays blog\'s title and author, but not the details by default', () => {
    render(<Blog blog={testBlog} user={testUser} />)

    const element = screen.getByText('Test title - Some Author')
    const div = document.querySelector('.blogDetail')

    expect(element).toBeVisible()
    expect(div).toHaveStyle('display: none')
  })

  test('displays blog\'s detail when view button is clicked', async () => {
    render(<Blog blog={testBlog} user={testUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')

    await user.click(button)

    const div = document.querySelector('.blogDetail')

    expect(div).toHaveTextContent('someurl.com')
    expect(div).toHaveTextContent('Likes 3')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const onLike = vi.fn()

    render(<Blog blog={testBlog} user={testUser} onLike={onLike} />)

    const button = screen.getByText('Like')

    await user.click(button)
    await user.click(button)

    expect(onLike.mock.calls).toHaveLength(2)
  })
})