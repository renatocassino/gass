#!/usr/bin/env node
const glob = require('glob');
const fs = require('fs');
const ScssTokenizer = require('scss-tokenizer');

let program = require('commander');
program
  .version('0.1.0')
  .option('-f, --files [name]', 'Glob of scss files')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

program.parse(process.argv);

const classToSearch = process.argv[2];
const globFiles = process.files || '**/*.scss'

console.log('Searching in: ' + globFiles);

glob(globFiles, function (er, files) {
  files.forEach(function(file) {
    console.log('Reading file ' + file)

    fs.readFile(file, 'utf-8', function(err, data) {
      const tokens = ScssTokenizer.tokenize(data)
      console.log(tokens)
    })
  })
})


function search(query, file) {

}

