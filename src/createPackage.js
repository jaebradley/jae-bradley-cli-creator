import fs from 'fs-extra';
import { spawn } from 'child_process';
import untildify from 'untildify';

import promptTargetDirectory from './prompters/promptTargetDirectory';
import promptPackageName from './prompters/promptPackageName';
import promptGitHubUsername from './prompters/promptGitHubUsername';
import promptPackageDescription from './prompters/promptPackageDescription';
import generatePackageJSON from './generatePackageJSON';
import {
  babelrc,
  eslintignore,
  eslintrc,
  gitignore,
  npmignore,
  travis,
  commitlint,
} from './constants';

const filesToCopy = Object.freeze([
  {
    targetFilePath: '.babelrc',
    content: babelrc,
  },
  {
    targetFilePath: '.eslintignore',
    content: eslintignore,
  },
  {
    targetFilePath: '.eslintrc',
    content: eslintrc,
  },
  {
    targetFilePath: '.gitignore',
    content: gitignore,
  },
  {
    targetFilePath: '.npmignore',
    content: npmignore,
  },
  {
    targetFilePath: '.travis.yml',
    content: travis,
  },
  {
    targetFilePath: 'commitlint.config.js',
    content: commitlint,
  },
]);

const devDependencies = Object.freeze([
  {
    name: '@babel/cli',
    version: 'latest',
  },
  {
    name: '@babel/core',
    version: 'latest',
  },
  {
    name: '@babel/preset-env',
    version: 'latest',
  },
  {
    name: '@commitlint/cli',
    version: 'latest',
  },
  {
    name: '@commitlint/config-angular',
    version: 'latest',
  },
  {
    name: '@commitlint/prompt',
    version: 'latest',
  },
  {
    name: '@commitlint/prompt-cli',
    version: 'latest',
  },
  {
    name: 'babel-jest',
    version: 'latest',
  },
  {
    name: 'babel-core',
    version: '7.0.0-bridge.0',
  },
  {
    name: 'codecov',
    version: 'latest',
  },
  {
    name: 'eslint',
    version: 'latest',
  },
  {
    name: 'eslint-config-airbnb-base',
    version: 'latest',
  },
  {
    name: 'eslint-plugin-import',
    version: 'latest',
  },
  {
    name: 'husky',
    version: 'latest',
  },
  {
    name: 'jest',
    version: 'latest',
  },
  {
    name: 'semantic-release',
    version: 'latest',
  },
  {
    name: 'travis-deploy-once',
    version: 'latest',
  },
]);

const dependencies = Object.freeze([
  'commander',
  'inquirer',
]);

const createPackage = async () => {
  let { targetDirectory } = await promptTargetDirectory();
  const { packageName } = await promptPackageName();
  const { packageDescription } = await promptPackageDescription();
  const { gitHubUsername } = await promptGitHubUsername();

  const generatedPackageJSON = generatePackageJSON({
    name: packageName,
    description: packageDescription,
    gitHubUsername,
  });

  targetDirectory = untildify(targetDirectory);

  try {
    // Ensure the directory is created
    fs.ensureDirSync(targetDirectory);
    console.log(`Found or created directory: ${targetDirectory}`);
  } catch (error) {
    console.error(`Could not create / verify directory: ${targetDirectory}`);
    throw error;
  }

  try {
    try {
      // Ensure that the package.json file is created
      fs.outputFileSync(`${targetDirectory}/package.json`, generatedPackageJSON);
      console.log('Created package.json');
    } catch (error) {
      console.error('Could not create package.json');
      throw error;
    }

    filesToCopy.forEach(async ({ targetFilePath, content }) => {
      const filePath = `${targetDirectory}/${targetFilePath}`;
      try {
        await fs.outputFile(filePath, content);
        console.log(`Copied content to ${filePath}`);
      } catch (error) {
        console.error(`Could not copy contents to ${filePath}`);
        throw error;
      }
    });

    try {
      spawn(
        'npm',
        [
          'install',
          '--save-dev',
          ...devDependencies.map(({ name, version }) => `${name}@${version}`),
        ],
        { cwd: targetDirectory, stdio: 'inherit' },
      );

      spawn(
        'npm',
        [
          'install',
          '--save',
          ...dependencies,
        ],
        { cwd: targetDirectory, stdio: 'inherit' },
      );

      spawn('git', ['init'], { cwd: targetDirectory, stdio: 'inherit' });
    } catch (error) {
      console.error(`Failed to navigate to ${targetDirectory} and install all dependencies`);
      throw error;
    }
  } catch (error) {
    await fs.removeSync(targetDirectory);
    console.log(`There was an error - removing ${targetDirectory}`);
    throw error;
  }
};

export default createPackage;
