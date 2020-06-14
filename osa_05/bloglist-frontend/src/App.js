import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateLikes = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const handleBlogAdd = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='usernameField'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='passwordField'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )

  const blogForm = () => {

    return (
      <div>
        <Togglable buttonLabel='new blog'>
          <BlogForm
            setNotification={setNotification}
            onBlogAdd={handleBlogAdd}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>the incredible blogs-app</h2>
      {notification}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={() => { window.localStorage.clear() }}>logout</button></p>
          {blogForm()}
          <br></br>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog setNotification={setNotification} key={blog.id} blog={blog} updateLikes={updateLikes} user={user} />
            )}
        </div>
      }
    </div>
  )
}


export default App