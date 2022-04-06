import Togglable from "./Togglable";

const Blog = ({ blog }) => (
  <div>
    <div style={{ display: "inline-block" }}>
      {blog.title} - {blog.author}
    </div>
    <div style={{ display: "inline-block" }}>
      <Togglable
        style={{ display: "inline-block" }}
        buttonLabel="view"
        childButtonLabel="hide"
      ></Togglable>
    </div>
  </div>
);

export default Blog;
