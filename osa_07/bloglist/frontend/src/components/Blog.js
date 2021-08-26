import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogs';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  if (!blog) return null;

  const handleLike = async () => {
    const blogToLike = blog;
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
    dispatch(updateBlog(likedBlog));
  };

  const handleRemove = async () => {
    const blogToRemove = blog;
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
    if (ok) dispatch(removeBlog(blog.id));
  };

  return(
    <div>

      <h2>{blog.title}</h2>

      <div>
        <a href={blog.url}>{blog.url}</a>

        <div>{blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>

        <div>added by {blog.author}</div>

        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
