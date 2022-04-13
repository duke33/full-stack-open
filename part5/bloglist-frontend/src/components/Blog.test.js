import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  _id: '616c03df1e0a061d5c9d309a',
  title: 'Solo me borra mi dueño que es Mariano',
  author: 'el middleware anda2',
  url: 'wwwjwt.com',
  likes: 78,
  user: '616bd66581da029122bf51ff',

}

test('renders content', () => {


  const { container } =   render(<Blog
    key={blog._id}
    blog={blog}
    user={blog.user}
  />)

  const div = container.querySelector('.blogShort')

  expect(div).toBeDefined()

  expect(div).toHaveTextContent(
    `${blog.title} - ${blog.author}`
  )

})

test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
//Component render
  const { container } =   render(<Blog
    key={blog._id}
    blog={blog}
    user={blog.user}
  />)

  //Get and press button
  const button = screen.getByText('View')
  userEvent.click(button)

  const blogUrlContainer = within(container).getByText(blog.url)
  const likesContainer = container.querySelector('.likes')


  expect(blogUrlContainer).toHaveTextContent(
    blog.url
  )

  expect(likesContainer).toHaveTextContent( `likes ${blog.likes} Like`
  )

})

test('Click Like button works', () => {
  const mockHandler = jest.fn()


  //Component render
  render(<Blog
    key={blog._id}
    blog={blog}
    user={blog.user}
    handleLikeClick={mockHandler}
  />)



  //Get and press View button
  const viewButton = screen.getByText('View')
  userEvent.click(viewButton)

  //Get and press Like button
  const likeButton = screen.getByText('Like')
  userEvent.click(likeButton)
  userEvent.click(likeButton)


  //screen.debug(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})