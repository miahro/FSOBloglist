const listHelper = require('../utils/list_helper')
const testcase = require('./testbloglist')

describe('favoriteBlog', () => {

  test('with test case Dijkstra blog is most liked', () => {
    const result = listHelper.favoriteBlog(testcase.bloglist)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})
