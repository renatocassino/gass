let program = require('commander')

program
  .version('1.3.0')
  .option('-f, --files [glob]', 'Glob of scss files')

program.parse(process.argv)

module.exports = program
