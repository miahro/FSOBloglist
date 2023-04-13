require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

//set token expiry time to very short for testing
// and longer for normal use
const TOKENTIMEOUT = process.env.NODE_ENV === 'test'
  ? 30
  : 60*60*2

module.exports = {
  MONGODB_URI,
  PORT,
  TOKENTIMEOUT
}