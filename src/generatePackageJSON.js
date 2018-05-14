const generatePackageJSON = ({
  name,
  description,
  gitHubUsername,
}) => (JSON.stringify({
  name: `${name}`,
  version: '0.0.0-development',
  description: `${description}`,
  main: './build/index.js',
  bin: {},
  global: true,
  scripts: {
    codecov: 'codecov',
    commitmsg: 'commitlint -e $GIT_PARAMS',
    compile: 'babel src/ -d build/ --delete-dir-on-start --copy-files',
    'compile:prod': 'BABEL_ENV=production npm run compile',
    lint: 'eslint --ext .js .',
    test: 'jest --coverage --passWithNoTests',
    prepublishOnly: 'npm run compile:prod',
    'semantic-commit': 'commit',
    'semantic-release': 'semantic-release',
    'travis-deploy-once': 'travis-deploy-once',
  },
  repository: {
    type: 'git',
    url: `https://github.com/${gitHubUsername}/${name}.git`,
  },
  keywords: [],
  bugs: {
    url: `https://github.com/${gitHubUsername}/${name}/issues`,
  },
  homepage: `https://github.com/${gitHubUsername}/${name}#readme`,
  jest: {
    testEnvironment: 'node',
  },
}, null, 2));

export default generatePackageJSON;
