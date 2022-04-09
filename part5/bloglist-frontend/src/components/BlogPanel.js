import React from 'react'
import Blog from './Blog'
export default function BlogPanel({ blogs, user, setBlogs }) {
  return (
    <div>
      {blogs
        .sort(function (a, b) {
          return b.likes - a.likes
        })
        .map((blog) => (
          <Blog
            key={blog._id}
            blog={blog}
            user={user}
            setBlogs={setBlogs}
            blogs={blogs}
          />
        ))}
    </div>
  )
}
