const fs = require('fs')
const ScssTokenizer = require('scss-tokenizer')
const parser = require('./parser')

const classToSearch = process.argv[2]

const readFile = async function(file) {
  fs.readFile(file, 'utf-8', async function(err, data) {
    const tokens = ScssTokenizer.tokenize(data)
    parser(tokens, classToSearch, file)
  })
}

module.exports = readFile
