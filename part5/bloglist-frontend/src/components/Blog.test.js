import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    _id: '616c03df1e0a061d5c9d309a',
    title: 'Solo me borra mi dueño que es Mariano',
    author: 'el middleware anda2',
    url: 'wwwjwt.com',
    likes: 78,
    user: '616bd66581da029122bf51ff',

  }


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