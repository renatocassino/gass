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

  it('should ident is the same method of word', () => {
    expect(interpreter['word'] === interpreter['ident']).toBe(true)
  })

  it('should remove the list when close the braces', () => {
    const state = interpreter['}']({ fifo: [1,2,3] })
    expect(state).toEqual({ fifo: [1,2], lastTokens: [] })
  })

  it('should append token when open braces', () => {
    token = tokenArrayToToken(['word', '.class', 1])
    const state = interpreter['{']({
      lastTokens: [token],
      fifo: [],
      classToSearch: '.not-found',
      results: []
    })

    expect(state.fifo).toEqual(['.class'])
  })

  it('should bring result when find class', () => {
    token = tokenArrayToToken(['word', '.class', 1])
    const state = interpreter['{']({
      lastTokens: [token],
      fifo: [],
      classToSearch: '.class',
      file: '/path/to/file.scss',
      results: []
    })

    expect(state.results).toEqual([{
      file: '/path/to/file.scss',
      line: 1
    }])
  })
})