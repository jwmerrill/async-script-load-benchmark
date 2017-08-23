Simulation of a requirejs project that asynchronously loads many files. The system will load a dynamically generated tree of javascript files with a given number of files and branching factor.

In other words, each file will require a number of additional files specified by the branching factor, until the specified total number of files have been loaded.

Designed as a benchmark for loading many files with dev tools open.

## Install
```
yarn
```

## Run
```
npm run start
```

## Use
```
http://localhost:8001/
```