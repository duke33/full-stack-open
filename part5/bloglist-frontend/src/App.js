import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import helpers from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await helpers.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      helpers.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

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

          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
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
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
