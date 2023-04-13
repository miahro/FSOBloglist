const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('login test', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('login succeeds with correct password', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
  })
  test('login attempt of non-existing user returns 404', async () => {
    await api
      .post('/api/login')
      .send({ username: 'non-existing-user', password: 'sekret' })
      .expect(404)
  })
  test('login attempt with wrong password returns 401', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekretX' })
      .expect(401)
  })



})