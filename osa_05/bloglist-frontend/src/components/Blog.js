import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, user, setNotification }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const addLike = async event => {
    event.preventDefault()
    const updatedLikes = blog.likes + 1
    const likedBlog = {
      likes: updatedLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog.id, likedBlog)
    updateLikes(likedBlog)
  }
  
  const deleteBlog = async event => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        await blogService.remove(blog.id)
        setNotification('blog removed successfully')
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      } catch (exception) {
        setNotification('error deleting the blog')
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      }
    }
  }
  
  // Had to do this silly thing because tests kept implying that username can't be read from undefined
  const loggedUser = () => {return user !== undefined ? user.username : undefined}

  const [fullInfo, setFullInfo] = useState(false)
  const buttonText = () => (fullInfo ? 'show less' : 'show more')
  const allInfo = { display: fullInfo ? '' : 'none' }
  
  return (
    <div style={blogStyle} className='blog'>
      <div>
        <b>{blog.title}</b> by {blog.author} <button onClick={() => setFullInfo(!fullInfo)} id='showMoreButton'>{buttonText()}</button>
      </div>
      <div style={allInfo} className='togglableContent'>
        <div><b>URL: </b>{blog.url}</div>
        <div><b>Likes: </b>{blog.likes} <button onClick={addLike} id='blogLikeButton'>like</button></div>
        <div><b>Posted by: </b>{blog.user.username}</div>
        <div>
          {
            loggedUser() === blog.user.username &&
            <button style={{ background: 'lightblue' }} onClick={deleteBlog} id='deleteButton'>remove</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Blog
