const getQueryFromArray = require('./getQueryFromArray')
const printResult = require('./printer')

const interpreter = {}
interpreter['word'] = function({ token, lastTokens }) {
  lastTokens.push(token)

  return {
    lastTokens: lastTokens
  }
}

interpreter['ident'] = interpreter['word']

interpreter['{'] = function({ lastTokens, fifo, classToSearch, file }) {
  const lastTokenValue = lastTokens.map((t) => t.value).join(' ')
  const lastToken = lastTokens[lastTokens.length-1]

  fifo.push(lastTokenValue)

  if(getQueryFromArray(fifo) === classToSearch) {
    printResult({
      file: file,
      line: lastToken.line
    })
  }

  return {
    fifo,
    lastTokens: []
  }
}

interpreter['}'] = function({ fifo }) {
  fifo.pop()
  return {
    fifo,
    lastTokens: []
  }
}

const parser = (tokens, classToSearch, file) => {
  tokens = tokens.filter((token) => token[0] != 'space' && token[0] != 'newline')

  let state = {
    fifo: [],
    lastTokens: []
  }

  tokens.forEach(function(tokenArray) {
    const token = {
      type: tokenArray[0],
      value: tokenArray[1],
      line: tokenArray[2]
    }

    const { fifo, lastTokens } = state

    if(typeof interpreter[token.type] !== 'undefined') {
      state = Object.assign({}, state, interpreter[token.type]({
        file, fifo, lastTokens, classToSearch, token
      }))
      return
    }

    state.lastTokens = []
  })
}

module.exports = parser