const colors = require('colors')
const fs = require('fs')

const printResult = async function(data) {
  const fileLine = fs.readFileSync(data.file).toString().split('\n')[data.line-1]

  const content = [
    colors.green(data.file),
    `${colors.cyan(data.line)}: ${colors.magenta(fileLine)}`,
    ''
  ]
  console.log(content.join('\n'))
}

module.exports = printResult
