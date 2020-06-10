import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setNotification, onBlogAdd }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const newBlog = await blogService.create(blog)
      onBlogAdd(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification('new blog added succesfully')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (exception) {
      setNotification('error posting the blog')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <p>title: <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          /></p>
        </div>
        <div>
          <p>author: <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /></p>
        </div>
        <div>
          <p>url: <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          /></p>
        </div>
        <button type="submit" id='createButton'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm