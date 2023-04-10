const _ = require('lodash')

const logger = require('./logger')

const dummy = (blogs) => {
  logger.info (blogs)
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

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.countBy(blogs, 'author')
  // logger.info('blogsByAuthor', blogsByAuthor)
  const maxAuthor = _.maxBy(_.keys(blogsByAuthor), (author) => blogsByAuthor[author])
  // logger.info('maxAuthor', maxAuthor)
  const result = {
    'author': maxAuthor,
    'blogs': blogsByAuthor[maxAuthor]
  }
  // logger.info(result)
  return result
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  // logger.info('groupedByAuthor: ', groupedByAuthor)
  const sumOfLikesByAuthor = _.mapValues(groupedByAuthor, (blogs) => _.reduce(blogs, (sum, blog) => sum + blog.likes,0))
  // logger.info('sumOfLikesbyAuthor', sumOfLikesByAuthor)
  // logger.info('Chan: ', sumOfLikesByAuthor['Michael Chan'])
  // logger.info('Martin: ', sumOfLikesByAuthor['Robert C. Martin'])
  // logger.info('Dijsktra: ', sumOfLikesByAuthor['Edsger W. Dijkstra'])
  const mostLikedAuthor = _.maxBy(_.keys(sumOfLikesByAuthor), (author) => sumOfLikesByAuthor[author])
  // logger.info('mostLikedAuthor', mostLikedAuthor)
  // logger.info(sumOfLikesByAuthor[mostLikedAuthor])
  const result = {
    'author': mostLikedAuthor,
    'likes': sumOfLikesByAuthor[mostLikedAuthor]
  }
  // logger.info(result)
  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
