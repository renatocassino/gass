const getQueryFromArray = require('./query/getQueryFromArray')
const printResult = require('./printer')

const search = async function(query, file, tokens) {
  let filo = []
  let isAttribute = false

  tokens.forEach(function(token) {
    if(token[0] === 'word') {
      if(isAttribute) {
        isAttribute = !isAttribute
        return
      }

      filo.push(token[1])

      if(getQueryFromArray(filo) === query) {
        printResult({
          file: file,
          line: token[2]
        })
      }
      return
    }

    if(token[0] === 'ident') {
      isAttribute = !isAttribute
      return
    }

    if(token[0] === '}') {
      filo.pop()
      return
    }
  })
}

module.exports = search
