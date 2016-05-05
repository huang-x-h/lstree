#! /usr/bin/env node

var program = require('commander');
var lstree = require('./lib/lstree');

program
  .version('1.0.0')
  .option('-o, --output', 'save output to file path')
  .option('-d, --directory <directory>', 'list directory path')
  .parse(process.argv);

console.log(program.directory)
lstree(program.directory, program.output);