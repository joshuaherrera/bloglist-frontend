import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("view");

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = (event) => {
    event.preventDefault();
    setLabel(label === "view" ? "hide" : "view");
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={handleClick}>{label}</button>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>{" "}
          <p>
            likes {blog.likes} <button>like</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
