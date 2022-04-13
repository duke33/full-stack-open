import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogService'
export default function BlogPanel({ blogs, user, setBlogs }) {

  const handleLikeClick = (likes, setLikes,blog) => {
    const { _id } = blog
    const newLikes = likes + 1
    blogService.giveALike({ newLikes }, _id).then(() => {
      setLikes(newLikes)
    })
  }


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
            handleLikeClick={handleLikeClick}
          />
        ))}
    </div>
  )
}
