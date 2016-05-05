var fs = require('fs');
var path = require('path');

function readDirectory(output, dir, tails) {
  tails = tails || [false];

  var files = fs.readdirSync(dir),
    prefix = indent(tails) + '├── ',
    tailPrefix = prefix.replace('├── ', '└── '),
    i = 0,
    n = files.length,
    filePath, stat, newTails;

  for (; i < n; i++) {
    filePath = path.join(dir, files[i]);
    stat = fs.statSync(filePath);
    output.push((i === n - 1 ? tailPrefix : prefix) + files[i]);

    if (stat.isDirectory()) {
      newTails = tails.slice();
      newTails.splice(newTails.length, 0, i !== n - 1);
      readDirectory(output, filePath, newTails);
    }
  }
}

function indent(tails) {
  var result = '';
  tails.forEach(function(tail) {
    // tail append space
    result += tail ? '│    ' : '     '
  });

  return result;
}

function repeatString(str, count) {
  var result = '';
  for (var i = 0; i < count; i++) {
    result += str;
  }

  return result;
}

module.exports = function ls(directory, outputFile) {
  if (!directory) {
    directory = process.cwd();
  }

  var output = [path.basename(directory)];

  readDirectory(output, directory || '.');

  output = output.join('\n');

  console.log(output);

  if (outputFile) {
    fs.writeFileSync(outputFile, output);
  }
};