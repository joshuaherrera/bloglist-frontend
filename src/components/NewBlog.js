import React, { useState } from "react";

const NewBlog = ({ addBlog }) => {
  const [blog, setBlog] = useState({ title: "", author: "", url: "" });

  const createBlog = (event) => {
    event.preventDefault();
    addBlog(blog);
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        title{" "}
        <input
          value={blog.title}
          name="title"
          onChange={({ target }) =>
            setBlog({
              ...blog,
              [target.name]: target.value,
            })
          }
        />
      </div>
      <div>
        author{" "}
        <input
          value={blog.author}
          name="author"
          onChange={({ target }) =>
            setBlog({
              ...blog,
              [target.name]: target.value,
            })
          }
        />
      </div>
      <div>
        url{" "}
        <input
          value={blog.url}
          name="url"
          onChange={({ target }) =>
            setBlog({
              ...blog,
              [target.name]: target.value,
            })
          }
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlog;
