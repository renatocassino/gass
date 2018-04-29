const fs = require('fs')
const ScssTokenizer = require('tacnoman-scss-tokenizer')
const parser = require('./parser')
const printResults = require('./printer').printResults

const classToSearch = process.argv[2]

const readFile = async function(file) {
  fs.readFile(file, 'utf-8', async function(err, data) {
    const tokens = ScssTokenizer.tokenize(data)
    const results = parser(tokens, classToSearch, file)
    printResults(results)
  })
}

module.exports = readFile
