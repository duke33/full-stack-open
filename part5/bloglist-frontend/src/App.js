import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoggedInHeader from './components/LoggedInHeader'
import BlogPanel from './components/BlogPanel'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const postFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedBlogAppUserJSON =
      window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUserJSON) {
      const user = JSON.parse(loggedBlogAppUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? (
        <div>
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        </div>
      ) : (
        <div>
          <LoggedInHeader
            user={user}
            setUser={setUser}
            successMessage={successMessage}
          />

          <Togglable
            buttonLabel="create new blog"
            ref={postFormRef}
            childButtonLabel="cancel"
          >
            <NewBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setSuccessMessage={setSuccessMessage}
              postFormRef={postFormRef}
              create={blogService.create}
            />
          </Togglable>

          <BlogPanel blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
