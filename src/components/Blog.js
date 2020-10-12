import React, { useState } from "react";

const Blog = ({ blog, blogService, setBlogs, user }) => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("view");
  const [blogLikes, setBlogLikes] = useState(blog.likes);

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const viewMore = (event) => {
    event.preventDefault();
    setLabel(label === "view" ? "hide" : "view");
    setVisible(!visible);
  };

  const addLike = async (event) => {
    event.preventDefault();
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const b = await blogService.updateBlog(updatedBlog, blog.id);
    setBlogLikes(b.likes);
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    // check if blog user === logged in user
    await blogService.deleteBlog(blog.id);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const removeButton = () => {
    if (blog.user.username === user.user) {
      return (
        <button
          onClick={(event) => {
            const msg = `Delete Blog "${blog.title}?"`;
            console.log(user);
            if (window.confirm(msg)) {
              removeBlog(event);
            }
          }}
        >
          remove
        </button>
      );
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={viewMore}>{label}</button>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>{" "}
          <p>
            likes {blogLikes} <button onClick={addLike}>like</button>
          </p>
          <p>Blog added by: {blog.user.name}</p>
          <p>{removeButton()}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
