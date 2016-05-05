#! /usr/bin/env node

var program = require('commander');
var lstree = require('./lib/lstree');

program
  .version('1.0.1')
  .option('-o, --output', 'save output to file path')
  .option('-d, --directory <directory>', 'list directory path')
  .parse(process.argv);

lstree(program.directory, program.output);