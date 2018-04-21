const fs = require('fs');
const ScssTokenizer = require('scss-tokenizer');
const search = require('./search')

const readFile = async function (er, files) {
  const classToSearch = process.argv[2]

  files.forEach(function(file) {
    fs.readFile(file, 'utf-8', function(err, data) {
      const tokens = ScssTokenizer.tokenize(data)
      search(classToSearch, file, tokens)
    })
  })
}

module.exports = readFile
