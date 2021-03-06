#!/usr/bin/env node
var browserify = require('browserify');
var tapeRun = require('tape-run');
var babelify = require('babelify');
var glob = require('glob');
const tapSpec = require('tap-diff');

//utils
const either = (value, left, right)  => value? right(value) : left(value)
const identity = i => i
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
  let [,,...specFiles] = argv;
  return specFiles && specFiles.length? specFiles : false;
}

const invalidInput = () => console.log('No valid Spec file has been supplied to the test runner')
const noSpecFilesFound = () => console.log('No valid Spec files were found')
const matchFiles = specFileMatch => new Promise((resolve, reject) => {
  glob(specFileMatch, function (er, files) {
    er? reject(er) : resolve(files);
  })
})

const runTests = (sourceSpec) => {
  browserify(sourceSpec)
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(tapeRun())
    .on('results', results => {
      if (!results.ok) {
        process.exit(1);
      }
    })
    .pipe(tapSpec())
    .pipe(process.stdout);
}

const parseSpecMatch = specFileMatch => {
  matchFiles(specFileMatch)
    .then(
      rcompose(
        files => either(files && files.length? files : false, noSpecFilesFound,identity),
        mapfn(runTests)
      ),
      err => console.log(err));
}

either(extractSpecFileMatchFromArgs(process.argv), invalidInput, mapfn(parseSpecMatch));
