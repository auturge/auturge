'use strict';

const trim = require('../trim');
const path = require('path');
const fs = require('fs');
const isValid = require('is-valid-path');

let sourceIn = '';
let targetFolder = '';
try {
    sourceIn = process.argv.slice(2)[0];
    targetFolder = process.argv.slice(2)[1];
} catch (error) {
    console.error('Could not interpret arguments.');
    console.error(error);
    return 1;
}

if (!targetFolder || targetFolder === '') {
    console.error('Target folder must be supplied.');
    console.error('argv:');
    console.error(process.argv);
    return 1;
}
const resolvedSource = path.join(process.cwd(), sourceIn);
const resolvedTargetFolder = path.join(process.cwd(), targetFolder);
const resolvedTarget = path.join(resolvedTargetFolder, 'package.json');

if (!isValid(resolvedTarget)) {
    console.error(`${resolvedTarget} is not a valid path.`);
    return 1;
}

if (!fs.existsSync(resolvedSource)) {
    console.error('Could not find package.json.');
    return 1;
}

if (!fs.existsSync(resolvedTargetFolder)) {
    console.error(`Target folder [${resolvedTargetFolder}] does not exist.`);
    return 1;
}

trim(resolvedSource, resolvedTarget, [
    'name', 'productName', 'version', 'description', 'author', 'license',
    'private', 'repository', 'bugs', 'files', 'dependencies', 'engines', 'main',
    'types', 'commonjs', 'es6', 'typings'
]);
