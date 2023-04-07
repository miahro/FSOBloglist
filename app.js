const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware= require('./utils/middleware')
const mongoose = require('mongoose')
const config = require('./utils/config')
const mongoUrl = config.MONGODB_URI


mongoose.set('strictQuery', false)
app.use(cors())
app.use(express.json())


mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error)
  })

app.use(middleware.requestLogger)

const Blog = require('./models/blog')


app.get('/api/blogs', (request, response, next) => {
  //logger.info('GET', request.path)
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))

})

app.post('/api/blogs', (request, response, next) => {
  //logger.info('POST: ',request.path, request.body)
  const blog = new Blog(request.body)
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app