const getQueryFromArray = require('./getQueryFromArray')
const printResult = require('./printer')

const interpreter = {}

interpreter['{'] = function({ lastToken, fifo, classToSearch, file }) {
  fifo.push(lastToken.value)

  if(getQueryFromArray(fifo) === classToSearch) {
    printResult({
      file: file,
      line: lastToken.line
    })
  }

  return {
    fifo
  }
}

interpreter['}'] = function({ fifo }) {
  fifo.pop()
  return {
    fifo
  }
}

const parser = (tokens, classToSearch, file) => {
  tokens = tokens.filter((token) => token[0] != 'space' && token[0] != 'newline')

  let state = {
    fifo: [],
    lastToken: null
  }

  tokens.forEach(function(tokenArray) {
    const token = {
      type: tokenArray[0],
      value: tokenArray[1],
      line: tokenArray[2]
    }

    const { fifo, lastToken } = state

    if(typeof interpreter[token.type] !== 'undefined') {
      state = Object.assign({}, state, interpreter[token.type]({
        file, fifo, lastToken, classToSearch
      }))
    }

    state.lastToken = token
  })
}

module.exports = parser