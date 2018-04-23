const tokenArrayToToken = require('../tokenArrayToToken')

describe('#tokenArrayToToken', () => {
  it('convert array token to token object', () => {
    token = ['word', '.class', 3]
    expect(tokenArrayToToken(token)).toEqual({
      type: 'word',
      value: '.class',
      line: 3
    })
  })
})
