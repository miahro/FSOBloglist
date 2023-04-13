const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('return of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 1000000)

  test('correct number of notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 1000000)

  test('blog items have id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    }, 1000000)
  })
})

describe('adding blogs', () => {
  test('blog can be added', async () => {
    const userLogin = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    const token = userLogin.body.token

    await api
      .post('/api/blogs')
      .send(helper.addedBlog)
      .set({ Authorization:`Bearer ${token}` })
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    const titles = response.body.map(blog => blog.title)
    const authors = response.body.map(blog => blog.author)
    const urls = response.body.map(blog => blog.url)
    expect(titles).toContain(helper.addedBlog.title)
    expect(authors).toContain(helper.addedBlog.author)
    expect(urls).toContain(helper.addedBlog.url)
  })


  test('added blog without likes defaults to 0', async () => {
    const userLogin = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    const token = userLogin.body.token

    const response = await api
      .post('/api/blogs')
      .send(helper.addedBlog)
      .set({ Authorization:`Bearer ${token}` })
    expect(response.body.likes).toEqual(0)
  })
  test('adding blog tokne fails 401', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    await api
      .post('/api/blogs')
      .send(helper.addedBlog)
      .expect(401)
  })



  test('added blog without title returns response 400', async () => {
    const userLogin = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    const token = userLogin.body.token
    await api
      .post('/api/blogs')
      .send(helper.blogNoTitle)
      .set({ Authorization:`Bearer ${token}` })
      .expect(400)
  })

  test('added blog without url returns response 400', async () => {
    const userLogin = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    const token = userLogin.body.token

    await api
      .post('/api/blogs')
      .send(helper.blogNoUrl)
      .set({ Authorization:`Bearer ${token}` })
      .expect(400)
  })
})

describe('delete blog', () => {
  test('blog can be deleted', async () => {
    const added = await api
      .post('/api/blogs')
      .send(helper.blogToBeDeleted)
    const id = added.body.id
    await api
      .delete(`/api/blogs/${id}`)
    const response = await api
      .get('/api/blogs')
    const idList = response.body.map(blog => blog.id)
    expect(idList).not.toContain(id)
  })
})

describe('change blog', () => {
  test('increase likes by 5', async () => {
    const response = await api
      .get('/api/blogs')
    const targetBlog = response.body[0]
    const origLikes = targetBlog.likes
    const newLikes = origLikes +5
    const changedBlog = {
      title: targetBlog.title,
      author: targetBlog.author,
      url: targetBlog.url,
      likes: newLikes
    }
    const changeResponse = await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(changedBlog)
      .expect(200)
    expect(changeResponse.body.likes).toEqual(newLikes)
  })
  test('change title', async () => {
    const response = await api
      .get('/api/blogs')
    const targetBlog = response.body[0]
    const newTitle = 'New title of blog'
    const changedBlog = {
      title: newTitle,
      author: targetBlog.author,
      url: targetBlog.url,
      likes: targetBlog.likes
    }
    const changeResponse = await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(changedBlog)
      .expect(200)
    expect(changeResponse.body.title).toContain(newTitle)
  })
  test('invalid update', async () => {
    const response = await api
      .get('/api/blogs')
    const targetBlog = response.body[0]
    const changedBlog = {
      author: targetBlog.author,
      url: targetBlog.url,
      likes: targetBlog.likes
    }
    await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(changedBlog)
      .expect(400)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})