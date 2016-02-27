# tape-runner-per-spec
Run Tape specs in electron, spawning a fresh Electron instance per Spec

An example of using [tape-run](https://github.com/juliangruber/tape-run) to run your Tape specs in Electron.
This example uses Babel and Browserify to package each spec and run it through electron so that seperate specs don't affect each other.
This example also supports Travis CI for running your tests through a CI server.
