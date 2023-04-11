const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

test('blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(addedBlog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)
  const titles = response.body.map(blog => blog.title)
  const authors = response.body.map(blog => blog.author)
  const urls = response.body.map(blog => blog.url)
  expect(titles).toContain(addedBlog.title)
  expect(authors).toContain(addedBlog.author)
  expect(urls).toContain(addedBlog.url)
})


test('added blog without likes defaults to 0', async () => {
  const response = await api
    .post('/api/blogs')
    .send(addedBlog)
  expect(response.body.likes).toEqual(0)
})


afterAll(async () => {
  await mongoose.connection.close()
})