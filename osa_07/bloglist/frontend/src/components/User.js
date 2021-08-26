import React from 'react';

const User = ({ user, blogs }) => {
  if (!user) return null;
  const blogsByUser = blogs.filter((blog) => blog.user.id === user.id);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogsByUser.map(({ id, title }) =>
          <li key={id}>
            {title}
          </li>
        )}
      </ul>
    </div>
  );
};

export default User;
