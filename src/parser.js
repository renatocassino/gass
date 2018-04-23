const interpreter = require('./interpreter')
const tokenArrayToToken = require('./tokenArrayToToken')

const parser = (tokens, classToSearch, file) => {
  tokens = tokens.filter((token) => token[0] != 'space' && token[0] != 'newline')

  let state = {
    fifo: [],
    lastTokens: [],
    results: []
  }

  for(let i = 0; i < tokens.length; i++) {
    const token = tokenArrayToToken(tokens[i])
    const { fifo, lastTokens, results } = state

    if(typeof interpreter[token.type] !== 'undefined') {
      state = Object.assign({}, state, interpreter[token.type]({
        file, fifo, lastTokens, classToSearch, token, results
      }))

      continue
    }

    state.lastTokens = []
  }

  return state.results
}

module.exports = parser
