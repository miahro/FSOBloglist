const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username) {
    return response.status(400).send( { error: 'username missing' })
  }
  if (username.length < 3) {
    return response.status(400).send({ error: 'username must be 3 characters or more' })
  }
  if (!password) {
    return response.status(400).send( { error: 'password missing' })
  }
  if (password.length < 3) {
    return response.status(400).send({ error: 'password must be 3 characters or more' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  console.log(users)
  response.json(users)
})


module.exports = usersRouter