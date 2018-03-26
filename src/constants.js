const babelrc = JSON.stringify({
  presets: ['@babel/preset-env'],
}, null, 2);

const eslintignore = `coverage/*
build
node_modules
`;

const eslintrc = JSON.stringify({
  extends: 'airbnb-base',
  env: {
    jest: true,
  },
}, null, 2);

const gitignore = `# Logs
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
`;

const npmignore = `.DS_Store
.eslintcache
node_modules
npm-debug.log
.travis.yml
src/
test/
*.test.js
coverage/
`;

const travis = `language: node_js
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
`;

const commitlint = `module.exports = { extends: ['@commitlint/config-angular'] };
`;

export {
  babelrc,
  eslintignore,
  eslintrc,
  gitignore,
  npmignore,
  travis,
  commitlint,
};
