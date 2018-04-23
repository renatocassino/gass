const interpreter = require('../interpreter')
const tokenArrayToToken = require('../tokenArrayToToken')

describe('#interpreter', () => {
  let token

  it('should add token to lastTokens when type is word to empty list', () => {
    token = tokenArrayToToken(['word', '.class', 1])
    const state = interpreter['word']({ token, lastTokens: [] })
    expect(state).toEqual({
      lastTokens: [token]
    })
  })

  it('should add token to lastTokens when type is word to list', () => {
    token = tokenArrayToToken(['word', '.class', 1])
    const lastToken = tokenArrayToToken(['word', '.first-class', 1])

    const state = interpreter['word']({ token, lastTokens: [lastToken] })
    expect(state).toEqual({
      lastTokens: [lastToken, token]
    })
  })
})