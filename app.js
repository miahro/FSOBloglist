//require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON')
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error)
  })

app.get('/api/blogs', (request, response) => {
  logger.info('GET', request.path)
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch((error) => {
      logger.error('error in getting blogs:', error)
    })
})

app.post('/api/blogs', (request, response) => {
  logger.info('POST: ',request.path, request.body)
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => {
      logger.error('error in posting new blog: ', error)
    })
})

module.exports = app