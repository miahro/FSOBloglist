const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })
  const savedBlog = await blog.save()
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