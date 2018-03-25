const generatePackageJSON = ({
  name,
  description,
  gitHubUsername,
}) => (JSON.stringify({
  name: `${name}`,
  version: '0.0.0-development',
  description: `${description}`,
  main: 'index.js',
  bin: {},
  scripts: {
    codecov: 'codecov',
    commitmsg: 'commitlint -e $GIT_PARAMS',
    compile: 'babel -d build/ src/ --ignore node_modules,*.test.js',
    lint: 'eslint --ext .js .',
    test: 'jest --coverage --passWithNoTests',
    prepublishOnly: 'npm run compile',
    'semantic-commit': 'commit',
    'semantic-release': 'semantic-release',
    'travis-deploy-once': 'travis-deploy-once',
  },
  repository: {
    type: 'git',
    url: `https://github.com/${gitHubUsername}/${name}.git`,
  },
  keywords: [
    'github',
    'cli',
    'personal access token',
    'github personal access token',
  ],
  author: 'jae.b.bradley@gmail.com',
  license: 'MIT',
  bugs: {
    url: `https://github.com/${gitHubUsername}/${name}/issues`,
  },
  homepage: `https://github.com/${gitHubUsername}/${name}#readme`,
  jest: {
    testEnvironment: 'node',
  },
  devDependencies: {
    '@babel/cli': '^7.0.0-beta.42',
    '@babel/core': '^7.0.0-beta.42',
    '@babel/preset-env': '^7.0.0-beta.42',
    '@commitlint/cli': '^6.1.3',
    '@commitlint/config-angular': '^6.1.3',
    '@commitlint/prompt': '^6.1.3',
    '@commitlint/prompt-cli': '^6.1.3',
    codecov: '^3.0.0',
    eslint: '^4.19.1',
    'eslint-config-airbnb-base': '^12.1.0',
    'eslint-plugin-import': '^2.9.0',
    husky: '^0.14.3',
    jest: '^22.4.3',
    'semantic-release': '^15.1.4',
    'travis-deploy-once': '^4.4.1',
  },
  dependencies: {
    commander: '^2.15.1',
    inquirer: '^5.1.0',
  },
}, null, 2));

export default generatePackageJSON;
