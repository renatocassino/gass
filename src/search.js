const getQueryFromArray = require('./query/getQueryFromArray')
const printResult = require('./printer')

const interpreter = {}
interpreter['word'] = function({
  value,
  line,
  file,
  query,
  isAttribute,
  fifo
}) {
  if(isAttribute) {
    return {
      isAttribute: !isAttribute
    }
  }

  fifo.push(value)

  if(getQueryFromArray(fifo) === query) {
    printResult({
      file: file,
      line: line
    })
  }
  return {
    fifo
  }
}

interpreter['ident'] = function({ isAttribute }) {
  return {
    isAttribute: !isAttribute
  }
}

interpreter['}'] = function({ fifo }) {
  fifo.pop()
  return {
    fifo
  }
}

const search = async function(query, file, tokens) {
  let state = {
    isAttribute: false,
    fifo: []
  }
  tokens.forEach(function(token) {
    const [ type, value, line ] = token
    const { isAttribute, fifo } = state

    if(typeof interpreter[type] !== 'undefined') {
      state = Object.assign({}, state, interpreter[type]({
        value, line, file, query, fifo, isAttribute
      }))
      return
    }
  })
}

module.exports = search
