Simulation of a requirejs project that asynchronously loads many files. The system will load a dynamically generated tree of javascript files with a given number of files and branching factor.

In other words, each file will require a number of additional files specified by the branching factor, until the specified total number of files have been loaded.

Designed as a benchmark for loading many files with dev tools open.

## Hosted version
Hosted version at https://blooming-hamlet-93701.herokuapp.com/

Note: I recommend running the server locally instead of using the hosted version because the hosted version is on a slow free server, and the slowness of network and the server may confound results of the test.

## Install
```
yarn
```

Alternatively, `npm install` should also work.

## Run
```
npm run start
```

To run on a different port, specify PORT as an env variable:
```
env PORT=4321 npm run start
```

## Use
```
http://localhost:5000/
```

Specify the number of files and the branching factor, and press "Run" to load files. To run a new test, reload the page.

Try running the test both with and without dev tools, and with different panels open in the dev tools.
