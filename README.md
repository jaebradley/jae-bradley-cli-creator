# jae-bradley-cli-creator

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/jae-bradley-cli-creator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/jae-bradley-cli-creator.svg?branch=master)](https://travis-ci.org/jaebradley/jae-bradley-cli-creator)
[![codecov](https://codecov.io/gh/jaebradley/jae-bradley-cli-creator/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/jae-bradley-cli-creator)
[![npm](https://img.shields.io/npm/v/jae-bradley-cli-creator.svg)](https://www.npmjs.com/package/jae-bradley-cli-creator)
[![npm-total-downloads](https://img.shields.io/npm/dt/jae-bradley-cli-creator.svg)](https://www.npmjs.com/package/jae-bradley-cli-creator)
![GitHub](https://img.shields.io/github/license/jaebradley/jae-bradley-cli-creator)

CLI that creates the starting point for npm package CLI projects using a base template I like

![alt-text](https://imgur.com/PkljD9Z.png)

* [Features](#features)
* [Files](#files)
  * [Contents](#contents)
  * [`.babelrc`](#babelrc)
  * [`.eslintignore`](#eslintignore)
  * [`.eslintrc`](#eslintrc)
  * [`.gitignore`](#gitignore)
  * [`.npmignore`](#npmignore)
  * [`.travis.yml`](#travis.yml)
  * [`commitlint.config.js`](#commitlint.config.js)
  * [`package.json`](#package.json)

## Features

* [`babel`](https://babeljs.io/)
* [`jest`](https://facebook.github.io/jest/)
* [`airbnb` `eslint` config](https://www.npmjs.com/package/eslint-config-airbnb)
* [`angular` commit message convention](https://www.npmjs.com/package/@commitlint/config-angular)
* [`husky` git hooks](https://www.npmjs.com/package/husky)
* [`semantic-release`](https://www.npmjs.com/package/semantic-release)
* [`greenkeeper-lockfile`](https://github.com/greenkeeperio/greenkeeper-lockfile) (i.e. use `Greenkeeper`)

## Files

* `.babelrc`
* `.eslintignore`
* `.eslintrc`
* `.gitignore`
* `.npmignore`
* `.travis.yml`
* `commitlint.config.js`
* `package-lock.json`
* `package.json`

### Contents

#### `.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### `.eslintignore`

```text
coverage/*
build
node_modules
```

#### `.eslintrc`

```json
{
  "extends": "airbnb-base",
  "env": {
    "jest": true
  }
}
```

#### `.npmignore`

```text
.DS_Store
.eslintcache
node_modules
npm-debug.log
.travis.yml
src/
test/
*.test.js
coverage/
```

#### `.travis.yml`

```yaml
language: node_js
cache:
  directories:
    - ~/.npm
notifications:
  email: true
node_js:
  - '8'
before_install:
  - npm install -g npm@5
  - npm install -g greenkeeper-lockfile@1
jobs:
  include:
    - stage: test
      script:
        - npm run compile
        - npm run lint
        - npm run test
      before_script: greenkeeper-lockfile-update
      after_script: greenkeeper-lockfile-upload
    - stage: deploy
      if: branch = master
      script: npm run travis-deploy-once "npm run semantic-release"
```

#### `commitlint.config.js`

```javascript
module.exports = { extends: ['@commitlint/config-angular'] };
```

#### `package.json`

Dynamically generated using the specified package name, package description, and GitHub username.

Will look something like

```json
{
  "version": "0.0.0-development",
  "main": "index.js",
  "scripts": {
    "codecov": "codecov",
    "commitmsg": "commitlint -e $GIT_PARAMS",
    "compile": "babel -d build/ src/ --ignore node_modules,*.test.js",
    "lint": "eslint --ext .js .",
    "test": "jest --coverage --passWithNoTests",
    "prepublishOnly": "npm run compile",
    "semantic-commit": "commit",
    "semantic-release": "semantic-release",
    "travis-deploy-once": "travis-deploy-once"
  },
  "jest": {
    "testEnvironment": "node"
  },
  "keywords": [],
  "name": "specified package name",
  "description": "specified package description",
  "repository": {
    "type": "git",
    "url": "https://github.com/specified-github-user-name/specified-package-name"
  },
  "bugs": {
    "url": "https://github.com/specified-github-user-name/specified-package-name/issues"
  },
  "homepage": "https://github.com/specified-github-user-name/specified-package-name/#readme",
  "devDependencies": {
    "@babel/cli": "whatever the latest version is",
    "@babel/core": "whatever the latest version is",
    "@babel/preset-env": "whatever the latest version is",
    "@commitlint/cli": "whatever the latest version is",
    "@commitlint/config-angular": "whatever the latest version is",
    "@commitlint/prompt": "whatever the latest version is",
    "@commitlint/prompt-cli": "whatever the latest version is",
    "babel-core": "^7.0.0-bridge.0",
    "babel-jest": "whatever the latest version is",
    "codecov": "whatever the latest version is",
    "eslint": "whatever the latest version is",
    "eslint-config-airbnb-base": "whatever the latest version is",
    "eslint-plugin-import": "whatever the latest version is",
    "husky": "whatever the latest version is",
    "jest": "whatever the latest version is",
    "semantic-release": "whatever the latest version is",
    "travis-deploy-once": "whatever the latest version is",
  },
  "dependencies": {
    "commander": "whatever the latest version is",
    "inquirer": "whatever the latest version is"
  }
}
```

Note: I'm using a specific version of `babel-core` (`^7.0.0-bridge.0`) because `@babel/core` doesn't play well with `jest`, right now.

#### `.gitignore`

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

build
.DS_Store
```
