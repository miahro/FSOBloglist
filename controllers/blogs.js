const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
      //logger.info(blogs[0])
    })
    .catch(error => next(error))

})

blogsRouter.post('/', (request, response, next) => {
  console.log('POST: ',request.path, request.body)
  const blog = new Blog(request.body)
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter