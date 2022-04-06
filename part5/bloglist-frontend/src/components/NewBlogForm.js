import React from "react";
import { useState } from "react";
import blogService from "../services/blogService";

export default function NewBlogForm({ setBlogs, blogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  function handlePostBlog(event) {
    event.preventDefault();
    blogService.create({ title, author, url }).then((newBlog) => {
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setURL("");
    });
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handlePostBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
