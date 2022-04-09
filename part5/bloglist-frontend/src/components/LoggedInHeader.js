import React from 'react'
import Notification from './Notification'

export default function LoggedInHeader({ user, setUser, successMessage }) {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={successMessage} type={'success'} />
      <div style={{ display: 'inline-block' }}>
        <p>{user.name} logged in</p>
      </div>
      <div style={{ display: 'inline-block' }}>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}
