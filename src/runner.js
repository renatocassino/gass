const glob = require('glob')
const program = require('./program')
const printResults = require('./printer')
const colors = require('colors')
const readFile = require('./readFile')

const run = function() {
  const globFiles = program.files || '**/*.scss'

  console.log(colors.yellow('Searching in: ' + globFiles + "\n"))

  glob(globFiles, readFile)
}

module.exports = run
