const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./testHelper')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

describe('when getting all blogs', () => {
  test('amount of blogs returned is correct', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs are in json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id fields are named correctly', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('when posting a blog to the database', () => {
  test('total blog count increases and contains recently added blog title', async () => {
    const newBlog = {
      title: 'Blog for testing',
      author: 'Matti Meikäläinen',
      url: 'https://google.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAfter.map(blog => blog.title)
    expect(titles).toContain(
      'Blog for testing'
    )
  })

  test('blog likes are set to 0 as default', async () => {
    const newBlog = {
      title: 'Blog with no likes',
      author: 'mmatila',
      url: "https://blogwithnolikes.com"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    const recent = blogsAfter.find(blog => blog.url === newBlog.url)

    expect(recent.likes).toBe(0)
  })

  test('error code 400 appears if title and url are missing', async () => {
    const newBlog = {
      author: 'Rick Hanlon',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mmatila',
      name: 'Manu Matila',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mmatila',
      name: 'Manu Matila',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  })

  test('creation fails with proper statuscode and message if password is not valid', async () => {
    const newUser = {
      username: 'mmatila',
      name: 'Manu Matila',
      password: 'p',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be atleast 3 characters long')
  })

  test('creation fails with proper statuscode and message if username is not valid', async () => {
    const newUser = {
      username: 'm',
      name: 'Manu Matila',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be atleast 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})