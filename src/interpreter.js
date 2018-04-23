const getQueryFromArray = require('./getQueryFromArray')

const interpreter = {}
interpreter['word'] = function({ token, lastTokens }) {
  lastTokens.push(token)

  return {
    lastTokens: lastTokens
  }
}

interpreter['ident'] = interpreter['word']

interpreter['{'] = function({ lastTokens, fifo, classToSearch, file, results }) {
  const lastTokenValue = lastTokens.map((t) => t.value).join(' ')
  const lastToken = lastTokens[lastTokens.length-1]

  fifo.push(lastTokenValue)

  if(getQueryFromArray(fifo) === classToSearch) {
    results.push({
      file: file,
      line: lastToken.line
    })
  }

  return {
    fifo,
    lastTokens: [],
    results
  }
}

interpreter['}'] = function({ fifo }) {
  fifo.pop()
  return {
    fifo,
    lastTokens: []
  }
}

module.exports = interpreter
