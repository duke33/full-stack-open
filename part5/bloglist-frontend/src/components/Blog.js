import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [summaryViewVisible, setSummaryViewVisible] = useState(true);

  const handleClick = () => {
    setSummaryViewVisible(!summaryViewVisible);
  };

  return (
    <div>
      {summaryViewVisible === true ? (
        <div style={blogStyle}>
          <div>
            {blog.title} <button onClick={handleClick}>View</button>
          </div>
        </div>
      ) : (
        <div style={blogStyle}>
          <div>
            <div>
              {blog.title} <button onClick={handleClick}>Hide</button>
            </div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes} <button>Like</button>
            </div>
            <div>{blog.author}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Blog;
