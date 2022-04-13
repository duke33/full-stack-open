import { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, user, setBlogs, blogs, handleLikeClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const isOwner = user.id === blog.user
  const [likes, setLikes] = useState(blog.likes)

  const [summaryViewVisible, setSummaryViewVisible] = useState(true)

  const handleVisibilityClick = () => {
    setSummaryViewVisible(!summaryViewVisible)
  }



  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog: ${blog.title} ?`)) {
      const { _id } = blog
      blogService.deleteBlog(_id).then(() => {
        setBlogs(blogs.filter((b) => b._id !== _id))
      })
    }
  }

  return (
    <div>
      {summaryViewVisible === true ? (
        <div style={blogStyle}>
          <div className='blogShort'>
            {blog.title} - {blog.author}{' '}
            <button onClick={handleVisibilityClick}>View</button>
          </div>
        </div>
      ) : (
        <div style={blogStyle}>
          <div>
            <div className='blogLong'>
              {blog.title} <button onClick={handleVisibilityClick}>Hide</button>
            </div>
            <div>{blog.url}</div>
            <div className="likes">
              likes {likes}{' '}
              <button onClick={() => handleLikeClick(likes,setLikes,blog)}>Like</button>
            </div>
            <div>{blog.author}</div>
            {isOwner && (
              <div>
                <button onClick={() => handleRemoveClick()}>Remove</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Blog
