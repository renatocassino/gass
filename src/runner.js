const glob = require('glob');
const fs = require('fs');
const ScssTokenizer = require('scss-tokenizer');
const colors = require('colors');
const getQueryFromArray = require('./query/getQueryFromArray')

const run = function() {
  let program = require('commander');

  program
    .version('0.1.0')
    .option('-f, --files [name]', 'Glob of scss files');

  program.parse(process.argv);

  const classToSearch = process.argv[2];
  const globFiles = process.files || '**/*.scss'

  console.log(colors.yellow('Searching in: ' + globFiles + "\n"));

  const accerts = []

  function search(query, file, tokens) {
    let filo = []
    let isAttribute = false
    let token = {}

    for(let i = 0; i < tokens.length; i++) {
      token = tokens[i]

      if(token[0] === 'word') {
        if(isAttribute) {
          isAttribute = !isAttribute
          continue
        }

        filo.push(token[1])

        if(getQueryFromArray(filo) === query) {
          accerts.push({
            file: file,
            line: token[2]
          })
        }
        continue
      }

      if(token[0] === 'ident') {
        isAttribute = !isAttribute
        continue
      }

      if(token[0] === '}') {
        filo.pop()
        continue
      }
    }
  }

  const printResults = function(accerts) {
    accerts.forEach(function(accert) {
      console.log(colors.green(accert.file))
      const content = fs.readFileSync(accert.file).toString().split("\n")
      const contentLine = content[accert.line-1]
      console.log(colors.cyan(accert.line) + ': ' + colors.magenta(contentLine))
      console.log()
    })
  }

  glob(globFiles, function (er, files) {
    for(let i = 0; i < files.length; i++) {
      const file = files[i]

      const data = fs.readFileSync(file, 'utf-8')
      const tokens = ScssTokenizer.tokenize(data)
      search(classToSearch, file, tokens)
    }

    printResults(accerts)
  })
}

module.exports = {
  run: run
}
