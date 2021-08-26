import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
    </div>
  );
}

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) =>
        <ListItem key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default BlogList;
