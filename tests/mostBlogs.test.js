const listHelper = require('../utils/list_helper')
const testcase = require('./testbloglist')

describe('mostBlogs', () => {

  test('Most blogs (3 pcs) written by Robert C. Martin', () => {
    const result = listHelper.mostBlogs(testcase.bloglist)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })


})
