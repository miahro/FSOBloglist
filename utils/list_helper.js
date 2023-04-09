const logger = require('./logger')

const dummy = (blogs) => {
  logger.info (blogs)
  return 1
}


const totalLikes = (blogs) => {
  let total = blogs.reduce((sum,blog) => sum + blog.likes, 0)
  logger.info(total)
  return total
}


module.exports = {
  dummy,
  totalLikes
}
