//const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'first test blog',
    author: 'Johg Wayne',
    url: 'http://imaginary-address.fi',
    likes: 1
  },
  {
    title: 'second test blog',
    author: 'Kim Jong-un',
    url: 'http://imaginary-address2.fi',
    likes: 2
  },
  {
    title: 'third test blog',
    author: 'Jesus Superstar',
    url: 'http://imaginary-address3.fi',
    likes: 3
  },
]

const addedBlog = {
  title: 'fourth test blog',
  author: 'Boris Johnson',
  url: 'http://imaginary-address4.fi'
}

const blogNoTitle = {
  author: 'Famours Writer',
  url: 'http://imaginary-address4.fi',
  likes: 1
}

const blogNoUrl = {
  title: 'sixth test blog',
  author: 'Some Body',
  likes: 3
}

const blogToBeDeleted = {
  title: 'Delete test',
  author: 'Unknown Author',
  url: 'http://imaginary-addressX.fi',
  likes: 3
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const newUser = {
  username: 'ville',
  name: 'Ville Tapio',
  password: 'malmi1',
}

const userNoUsername = {
  name: 'Ville Tapio',
  password: 'malmi1',
}

const usernameTooShort = {
  username: 'vi',
  name: 'Ville Tapio',
  password: 'malmi1',
}

const userPwdMissing = {
  username: 'villeX',
  name: 'Ville Tapio',
}


const userPwdTooShort = {
  username: 'villeY',
  name: 'Ville Tapio',
  password: 'ma',
}



module.exports = {
  initialBlogs,
  addedBlog,
  blogNoTitle,
  blogNoUrl,
  blogToBeDeleted,
  usersInDb,
  newUser,
  userNoUsername,
  usernameTooShort,
  userPwdMissing,
  userPwdTooShort
}