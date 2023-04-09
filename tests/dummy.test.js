const dummy = require('../utils/list_helper').dummy

describe('dummy', () => {
  test('dummy returns one', () => {
    expect(dummy([])).toBe(1)
  })
})