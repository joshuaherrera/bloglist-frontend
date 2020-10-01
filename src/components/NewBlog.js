import React from "react";

const NewBlog = ({ blog, submitNewBlog, setBlog }) => {
  return (
    <form onSubmit={submitNewBlog}>
      <div>
        title{" "}
        <input
          type="text"
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
          type="text"
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
          type="text"
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
