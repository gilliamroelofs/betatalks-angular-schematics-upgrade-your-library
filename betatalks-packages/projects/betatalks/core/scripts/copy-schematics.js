var fs = require('fs');

var project = 'betatalks/core';

// relative to copy-schematics.js file
var schematicSource = './schematics';
var schematicDest = '../../../dist/' + project + '/schematics';

makeDirIfNotExist(schematicDest);
copyRecursive(schematicSource, schematicDest);

function getDirMapAndFileNames(path) {
  return  fs.readdirSync(path).filter(function(fn) {
    return !fn.endsWith('.ts');
  });
}

function copyRecursive(sourcePath, destPath) {
  getDirMapAndFileNames(sourcePath).forEach(function(n) {
    if (n.indexOf('.') === -1) {
      var sourceMap = sourcePath + '/' + n;
      var destMap = destPath + '/' + n;
      makeDirIfNotExist(destMap);
      copyRecursive(sourceMap, destMap);
    } else {
      var source = sourcePath + '/' + n;
      var dest = destPath + '/' + n;
      fs.copyFileSync(source, dest);
    }
  });
}

function makeDirIfNotExist(path) {
  console.log(path);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}