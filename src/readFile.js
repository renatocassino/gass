const fs = require('fs')
const ScssTokenizer = require('scss-tokenizer')
const search = require('./search')

const classToSearch = process.argv[2]

const readFile = async function(file) {
  fs.readFile(file, 'utf-8', async function(err, data) {
    const tokens = ScssTokenizer.tokenize(data)
    search(classToSearch, file, tokens)
  })
}

module.exports = readFile
