const glob = require('glob')
const program = require('./program')
const colors = require('colors')
const readFile = require('./readFile')

const run = function() {
  const globFiles = program.files || '**/*.scss'

  console.log(colors.yellow('Searching in: ' + globFiles + '\n'))

  glob(globFiles, function (er, files) {
    files.forEach(readFile)
  })
}

module.exports = run
