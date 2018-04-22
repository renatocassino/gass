let program = require('commander')

program
  .version('0.1.0')
  .option('-f, --files [name]', 'Glob of scss files')

program.parse(process.argv)

module.exports = program
