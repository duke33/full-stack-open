import { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [likes, setLikes] = useState(blog.likes);

  const [summaryViewVisible, setSummaryViewVisible] = useState(true);

  const handleClick = () => {
    setSummaryViewVisible(!summaryViewVisible);
  };

  const likeClick = () => {
    const { _id } = blog;
    const newLikes = likes + 1;
    blogService.giveALike({ newLikes }, _id).then(() => {
      setLikes(newLikes);
    });
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
              likes {likes} <button onClick={() => likeClick()}>Like</button>
            </div>
            <div>{blog.author}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Blog;
