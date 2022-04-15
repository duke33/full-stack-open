import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  //const create = jest.fn()
  const create = jest.fn().mockImplementation(() => Promise.resolve())

  const { container } =  render(<NewBlogForm create={create} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const sendButton = screen.getByText('create')

  userEvent.type(titleInput, 'Jest Test' )
  userEvent.type(authorInput, 'Mariano' )
  userEvent.type(urlInput, 'www.jest.com' )

  userEvent.click(sendButton)

  console.log('handlePostBlog.mock.calls', create.mock.calls[0])

  expect(create.mock.calls).toHaveLength(1)
  //expect(handlePostBlog.mock.calls[0][0].content).toBe('Jest Test' )
})