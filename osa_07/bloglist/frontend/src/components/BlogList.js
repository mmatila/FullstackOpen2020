import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemText as MUIListItem } from '@material-ui/core';

const ListItem = ({ blog }) => {
  return (
    <div>
      <MUIListItem
        primary={<Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>}
        secondary={`by ${blog.author}, ${blog.likes} likes`}
      />
    </div>
  );
}

const BlogList = ({ blogs }) => {
  return (
    <div>
      <List>
        {blogs.map((blog) =>
          <ListItem key={blog.id} blog={blog} />
        )}
      </List>
    </div>
  );
}

export default BlogList;
