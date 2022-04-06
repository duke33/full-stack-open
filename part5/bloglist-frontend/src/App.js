import { useState, useEffect, useRef } from "react";
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

  const postFormRef = useRef();

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
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <Notification message={successMessage} type={"success"} />
          <div style={{ display: "inline-block" }}>
            <p>{user.name} logged in</p>
          </div>
          <div style={{ display: "inline-block" }}>
            <button onClick={handleLogout}>logout</button>
          </div>

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
            />
          </Togglable>
          {blogs
            .sort(function (a, b) {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
