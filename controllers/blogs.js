const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const title = body.title
  const author = body.author
  const url = body.url
  const likes = body.likes || 0
  if (!title) {return response.status(400).end()}
  if (!url) {return response.status(400).end()}
  //const user = await User.findOne({})
  // console.log('in add blog user: ', user)
  // console.log('in add blog user.id: ', user.id)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  // console.log('savedBlog.id ', savedBlog.id)
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const title = body.title
  const author = body.author
  const url = body.url
  const likes = body.likes || 0

  if (!title) {return response.status(400).end()}
  if (!url) {return response.status(400).end()}
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }
  const id = request.params.id
  const updated = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updated)
})

module.exports = blogsRouter