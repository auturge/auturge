const path = require('path');
const fs = require('fs');

module.exports = function(source, target, partsToInclude) {
  if (!source) {
    throw 'No Source filename provided.'
  }
  if (!target) {
    throw 'No Target filename provided.'
  }

  // resolve the relative paths
  let sourceFilePath = path.resolve(source);
  let targetFilePath = path.resolve(target);

  // get the file
  console.log(`Reading file at '${sourceFilePath}'.`);
  let sourceFile = fs.readFileSync(sourceFilePath, 'utf8');

  // create a clone in memory, keeping only the desired parts
  let clone = JSON.parse(sourceFile);
  if (partsToInclude) {
    for (let key in clone) {
      if (clone.hasOwnProperty(key)) {
        if (!partsToInclude.includes(key)) {
          console.log(`  Removing key '${key}'.`);
          delete clone[key];
        }
      }
    }
  } else {
    console.log('  No parts specified. Cloning the entire file.');
  }

  // save the clone
  console.log(`Writing file to '${targetFilePath}'.`);
  let json = JSON.stringify(clone, null, 2);
  fs.writeFileSync(targetFilePath, json, 'utf8');

  // done!
  console.log(` `);
};
