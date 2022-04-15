import React from 'react'
import { useState } from 'react'

export default function NewBlogForm({
  setBlogs,
  blogs,
  setSuccessMessage,
  postFormRef,
  create
}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  function handlePostBlog(event) {
    event.preventDefault()
    create({ title, author, url }).then((newBlog) => {
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setURL('')
      postFormRef.current.toggleVisibility()
    })
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={(e) => handlePostBlog(e,create)}>
        <div>
          title
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}
