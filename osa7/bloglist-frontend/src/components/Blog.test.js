import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  // eslint-disable-next-line no-unused-vars
  let container
  const updateMock = jest.fn()
  const removeMock = jest.fn()

  beforeEach(() => {
    const user = 'Kalle Kayttaja'

    const blog = {
      title: 'Mimmin keittiö',
      author: 'Mimmi M',
      url: 'https://mimminkeittio.vuodatus.net',
      likes: 0,
      user: {
        username: 'kayttaja',
        name: 'Kalle Kayttaja',
      },
    }

    container = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateMock}
        removeBlog={removeMock}
      />,
    ).container
  })

  test('renders title', () => {
    screen.getByText('Mimmin keittiö')
  })

  test('Shows detailed information when pressing button', async () => {
    const userevent = userEvent.setup()
    const button = screen.getByText('show')
    await userevent.click(button)

    screen.getByText('Mimmin keittiö')
    screen.getByText('https://mimminkeittio.vuodatus.net')
    screen.getByText('0')
    screen.getByText('Mimmi M')
    screen.getByText('Kalle Kayttaja')
  })

  test('Two calls are made when the button is pressed twice', async () => {
    const userevent = userEvent.setup()
    const showButton = screen.getByText('show')
    await userevent.click(showButton)

    const likeButton = screen.getByText('like')
    await userevent.click(likeButton)
    await userevent.click(likeButton)

    expect(updateMock.mock.calls).toHaveLength(2)
  })
})
