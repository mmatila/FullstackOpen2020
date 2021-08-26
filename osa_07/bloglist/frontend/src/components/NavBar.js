import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logout } from '../reducers/user';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const handleLogout = () => dispatch(logout());

  return (
    <nav>
      <Link to="/">blogs | </Link>
      <Link to="/users">users | </Link>
      {user.name} logged in <Button variant="outlined" onClick={handleLogout}>logout</Button>
    </nav>
  );
}

export default NavBar;