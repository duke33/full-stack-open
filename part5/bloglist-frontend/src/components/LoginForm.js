import { useState } from 'react'
import propTypes from 'prop-types'
import helpers from '../services/login'
import blogService from '../services/blogService'
import Notification from '../components/Notification'

export default function LoginForm({ setUser, setErrorMessage, errorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await helpers.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} type={'error'} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: propTypes.func.isRequired,
  setErrorMessage: propTypes.func.isRequired,
  errorMessage: propTypes.string,
}
