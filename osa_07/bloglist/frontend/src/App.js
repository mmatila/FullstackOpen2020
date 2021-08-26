/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, createBlog as addBlog } from './reducers/blogs';
import { login, setUser } from './reducers/user';
import UsersTable from './components/UsersTable';
import { getAllUsers } from './reducers/users';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import User from './components/User';
import BlogList from './components/BlogList';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => blogs);
  const users = useSelector(({ users }) => users);
  const user = useSelector(({ user }) => user);

  const userMatch = useRouteMatch('/users/:id')
  const matchingUser = userMatch
    ? users.find((user) =>  user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const matchingBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(setUser(user))
    dispatch(getAllUsers());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    dispatch(login({ username, password }));
  };

  const createBlog = (blog) => {
    try {
      dispatch(addBlog(blog));
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
    }
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

  return (
    <div>
      <NavBar />
      <Notification />
      <h2>blog app</h2>

      <Switch>
        <Route path="/" exact>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </Route>
        <Route path="/users" exact>
          <UsersTable blogs={blogs} users={users} />
        </Route>
        <Route path="/users/:id">
          <User user={matchingUser} blogs={blogs} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={matchingBlog} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
