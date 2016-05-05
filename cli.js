#! /usr/bin/env node

var program = require('commander');
var ls = require('./lib/ls');

program
  .version('0.0.1')
  .option('-o, --output', 'save output to file path')
  .option('-d, --directory', 'list directory path');

ls(program.directory, program.output);