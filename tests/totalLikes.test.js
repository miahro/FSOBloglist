const listHelper = require('../utils/list_helper')
const testcase = require('./testbloglist')

describe('total likes', () => {

  test('tewst list with 7 blogs with total 36 likes', () => {
    const result = listHelper.totalLikes(testcase.bloglist)
    expect(result).toBe(36)
  })
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})


describe('total likes', () => {
  test('when list is empty, likes is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})