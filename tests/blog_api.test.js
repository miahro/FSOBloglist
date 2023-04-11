const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'first test blog',
    author: 'Johg Wayne',
    url: 'http://imaginary-address.fi'
  },
  {
    title: 'second test blog',
    author: 'Kim Jong-un',
    url: 'http://imaginary-address2.fi'
  },
  {
    title: 'third test blog',
    author: 'Jesus Superstar',
    url: 'http://imaginary-address3.fi'
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 1000000)

test('correct number of notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
}, 1000000)

test('blog items have id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  }, 1000000)
})


afterAll(async () => {
  await mongoose.connection.close()
})