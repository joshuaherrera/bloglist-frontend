import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMsg] = useState(null);
  const [msgType, setMsgType] = useState("success");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //grab token if exists
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const cachedUser = JSON.parse(loggedUserJSON);
      setUser(cachedUser);
      blogService.setToken(cachedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedInUser)
      );
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setMsg(null);
      }, 5000);
      setMsgType("success");
      setMsg(`successfully logged in`);
    } catch (err) {
      setTimeout(() => {
        setMsg(null);
      }, 5000);
      setMsgType("error");
      setMsg(`${err}`);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    setTimeout(() => {
      setMsg(null);
    }, 5000);
    setMsgType("success");
    setMsg("successfully logged out");
  };

  const blogFormRef = useRef();

  const submitNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.createBlog(blogObject);
      setBlogs(blogs.concat(newBlog));
      // setBlog({ title: "", author: "", url: "" });
      setTimeout(() => {
        setMsg(null);
      }, 5000);
      setMsgType("success");
      setMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (err) {
      setTimeout(() => {
        setMsg(null);
      }, 5000);
      setMsgType("error");
      setMsg(`${err.message}`);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to the app</h2>
        <Notification message={message} msgType={msgType} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} msgType={msgType} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog addBlog={submitNewBlog} />
      </Togglable>

      {blogs
        .sort((x, y) => (x.likes < y.likes ? 1 : -1))
        .map((b) => (
          <Blog
            key={b.id}
            blog={b}
            blogService={blogService}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
