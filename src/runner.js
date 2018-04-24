const glob = require('glob')
const program = require('./program')
const colors = require('colors')
const readFile = require('./readFile')

const run = function() {
  let globFiles = program.files || '**/*.scss'
  if (globFiles[0] !== '/') {
    globFiles = process.cwd() + '/' + globFiles
  }

  console.log(colors.yellow('Searching in: ' + globFiles + '\n'))

  glob(globFiles, function (er, files) {
    if(er) {
      console.log(er.message)
      process.exit()
    }

    files.forEach(readFile)
  })
}

module.exports = run
