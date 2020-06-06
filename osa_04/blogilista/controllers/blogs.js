const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.title === undefined && body.url === undefined) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async(request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
      return response.status(401).json({
          error: 'token missing or invalid'
      })
  }
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json( { error: 'permission denied ' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
        
  const body = request.body

  const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

  if (updatedBlog) {
      response.json(updatedBlog.toJSON())
  } else {
      response.status(404).end()
  }
})

module.exports = blogsRouter