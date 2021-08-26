import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogs';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

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

  const handleComment = (e) => {
    e.preventDefault();
    const updatedComments = blog.comments.concat(comment);
    const updatedBlog = { ...blog, comments: updatedComments, user: blog.user.id }
    dispatch(updateBlog(updatedBlog));
    setComment('');
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

        <div>
          add comment:
          <form onSubmit={handleComment} >
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">submit</button>
          </form>
        </div>

        {blog.comments && <div>
        comments:
          <ul>
            {blog.comments.map(c =>
              <li key={blog.comments.indexOf(c)}>
                {c}
              </li>
            )}
          </ul>
        </div>}

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
