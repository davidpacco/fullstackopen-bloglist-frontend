import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  test('display blog\'s title and author, but not the details by default', () => {
    const blog = {
      title: 'Test title',
      author: 'Some Author',
      likes: 3,
      url: 'someurl.com',
      user: {
        name: 'Some User',
        username: 'someuser'
      }
    }
    const user = { username: 'someuser' }

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText('Test title - Some Author')
    const div = document.querySelector('.blogDetail')

    expect(element).toBeVisible()
    expect(div).toHaveStyle('display: none')
  })
})