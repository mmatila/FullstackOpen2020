import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';

import loginService from './services/login';
import storage from './utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { clear, notify } from './reducers/notification';
import { getBlogs, createBlog as addBlog, updateBlog, removeBlog } from './reducers/blogs';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type = 'success') => {
    dispatch(notify({
      message,
      type,
    }));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername('');
      setPassword('');
      setUser(user);
      notifyWith(`${user.name} welcome back!`);
      storage.saveUser(user);
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const createBlog = (blog) => {
    try {
      dispatch(addBlog(blog));
      blogFormRef.current.toggleVisibility();
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
    dispatch(updateBlog(likedBlog));
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
    if (ok) dispatch(removeBlog(id));
  };

  const handleLogout = () => {
    setUser(null);
    storage.logoutUser();
  };

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default App;
