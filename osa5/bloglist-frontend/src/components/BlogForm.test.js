import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import UserEvent from '@testing-library/user-event'

describe('<BlogForm/>', () => {

  test('Form calls callback function with right information', async() => {
    const userevent = UserEvent.setup()
    const createMock = jest.fn()

    render(<BlogForm createBlog={createMock}/>)

    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')

    const sendButton = screen.getByText('Add a new blog')



    await userevent.type(titleInput, 'Annin uunissa')
    await userevent.type(authorInput, 'Anni Paakkunainen')
    await userevent.type(urlInput, 'https://www.anninuunissa.fi')

    await userevent.click(sendButton)


    expect(createMock.mock.calls).toHaveLength(1)

    const result = createMock.mock.calls[0][0]
    expect(result).toStrictEqual(
      { title : 'Annin uunissa',
        author : 'Anni Paakkunainen',
        url: 'https://www.anninuunissa.fi',
      }
    )



  })
})