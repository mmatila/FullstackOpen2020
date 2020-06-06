const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const isPassInvalid = (password) => password.length < 3 || !password
const isUsernameInvalid = (username) => username.length < 3 || !username

usersRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(user.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (isUsernameInvalid(body.username)) {
        return response.status(400).json(
            { error: 'Username must be atleast 3 characters long'}
        )
    }

    if (isPassInvalid(body.password)) {
        return response.status(400).json(
            { error: 'Password must be atleast 3 characters long' }
        )
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter