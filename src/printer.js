const colors = require('colors')
const fs = require('fs')

const printResult = async function({ file, line }) {
  const fileLine = fs.readFileSync(file).toString().split('\n')[line-1]

  const content = [
    colors.green(file),
    `${colors.cyan(line)}: ${colors.magenta(fileLine)}`,
    ''
  ]

  console.log(content.join('\n'))
}

const printResults = (results) => {
  results.forEach(printResult)
}

module.exports = {
  printResults: printResults,
  printResult: printResult
}
