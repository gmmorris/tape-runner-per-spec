#!/usr/bin/env node
var browserify = require('browserify');
var tapeRun = require('tape-run');
var babelify = require('babelify');
var glob = require('glob-fs')({ gitignore: true });

//utils
const either = (value, left, right)  => value? right(value) : left(value)
const compose = (f, ...fns) => {
  if (fns.length == 1) {
    const g = fns.pop();
    return (...args) => f(g(...args));
  }
  return (...args) => f(compose(...fns)(...args));
};
const rcompose = (...fns) => {
  return compose(...fns.reverse());
};
const mapfn = fn => (arr) => arr.map(fn)
const reducefn = (fn, init) => (arr) => arr.reduce(fn, init)

// test script fns
const extractSpecFileMatchFromArgs = argv => {
  let [,,specFile] = process.argv;
  return specFile;
}

const invalidInput = () => console.log('No valid Spec file has been supplied to the test runner')
const noSpecFilesFound = () => console.log('No valid Spec files were found')
const matchFiles = specFileMatch => glob.readdirPromise(specFileMatch)

const runTests = (sourceSpec) => {
  browserify(sourceSpec)
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(tapeRun())
    .pipe(process.stdout);
}

const parseSpecMatch = specFileMatch => {
  matchFiles(specFileMatch)
    .then(
      rcompose(
        files => {
          if(files && files.length){
            return files;
          }
          noSpecFilesFound();
          return [];
        },
        mapfn(runTests)
      ),
      err => console.log(err));
}

either(extractSpecFileMatchFromArgs(process.argv), invalidInput, parseSpecMatch);
