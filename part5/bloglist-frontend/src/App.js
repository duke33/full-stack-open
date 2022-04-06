import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedBlogAppUserJSON =
      window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogAppUserJSON) {
      const user = JSON.parse(loggedBlogAppUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} type={"error"} />

          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <Notification message={successMessage} type={"success"} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Togglable buttonLabel="new blog">
            <NewBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setSuccessMessage={setSuccessMessage}
            />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
