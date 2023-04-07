//const config = require('./../utils/config')
// const mongoUrl = config.MONGODB_URI
// const logger = require('./../utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)



const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON')


module.exports = mongoose.model('Blog', blogSchema)