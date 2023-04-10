const listHelper = require('../utils/list_helper')
const testcase = require('./testbloglist')

describe('mostLikes', () => {

  test('Most likes (17) is for Adswer W. Dijkstra', () => {
    const result = listHelper.mostLikes(testcase.bloglist)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })


})
