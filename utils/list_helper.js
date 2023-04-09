const logger = require('./logger')

const dummy = (blogs) => {
  //logger.info (blogs)
  return 1
}


const totalLikes = (blogs) => {
  let total = blogs.reduce((sum,blog) => sum + blog.likes, 0)
  //logger.info(total)
  return total
}

const favoriteBlog = (blogs) => {
  const maxlikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxlikes)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
