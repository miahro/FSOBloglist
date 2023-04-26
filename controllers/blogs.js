const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


// functionality replaced with middleware.tokenExractor
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const title = body.title
  const author = body.author
  const url = body.url
  const likes = body.likes || 0
  if (!title) {return response.status(400).json({ error: 'no title' }).end()}
  if (!url) {return response.status(400).end({ error: 'no url' })}

  const user = request.user
  if (!user) {return response.status(404).json({ error: 'user not found' })}

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  console.log('backend delete called')
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const blogCreator = blog.user

  const user = request.user
  if (!user) {return response.status(404).json({ error: 'token invalid' })}

  if (blogCreator.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const title = body.title
  const author = body.author
  const url = body.url
  const likes = body.likes || 0
  const user = body.user



  if (!title) {return response.status(400).end()}
  if (!url) {return response.status(400).end()}

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user
  }
  console.log(user)
  console.log('put blog', blog)
  const id = request.params.id
  const updated = await Blog.findByIdAndUpdate(id, blog, { new: true })
  console.log('updated before populating', updated)
  updated.populate('user', { username: 1, name: 1 })
  console.log('updated after populating', updated)
  response.json(updated)
})

module.exports = blogsRouter