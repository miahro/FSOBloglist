const logger = require('./logger')

const dummy = (blogs) => {
  logger.info (blogs)
  return 1
}

module.exports = {
  dummy
}