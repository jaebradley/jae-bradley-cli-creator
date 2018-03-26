import fs from 'fs-extra';
import { exec } from 'child-process-promise';
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
  '@babel/cli',
  '@babel/core',
  '@babel/preset-env',
  '@commitlint/cli',
  '@commitlint/config-angular',
  '@commitlint/prompt',
  '@commitlint/prompt-cli',
  'babel-core',
  'babel-jest',
  'codecov',
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'husky',
  'jest',
  'semantic-release',
  'travis-deploy-once',
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
    await fs.ensureDir(targetDirectory);
    console.log(`Found or created directory: ${targetDirectory}!`);
  } catch (error) {
    console.error(`Could not create / verify directory: ${targetDirectory}`);
    throw error;
  }

  try {
    try {
      await fs.outputFile(`${targetDirectory}/package.json`, generatedPackageJSON);
      console.log('Created package.json!');
    } catch (error) {
      console.error('Could not create package.json');
      throw error;
    }

    filesToCopy.forEach(async ({ targetFilePath, content }) => {
      const filePath = `${targetDirectory}/${targetFilePath}`;
      try {
        await fs.outputFile(filePath, content);
        console.log(`Copied content to ${filePath}!`);
      } catch (error) {
        console.error(`Could not copy contents to ${filePath}`);
        throw error;
      }
    });

    console.log(`Navigating to ${targetDirectory} and installing all dependencies`);
    try {
      await exec(`cd ${targetDirectory}; npm install --save-dev ${devDependencies.join(' ')}; npm install --save ${dependencies.join(' ')}; git init`);
      console.log(`Navigated to ${targetDirectory} and installed all dependencies!`);
    } catch (error) {
      console.error(`Failed to navigate to ${targetDirectory} and install all dependencies`);
      throw error;
    }
  } catch (error) {
    await fs.remove(targetDirectory);
    console.log(`There was an error - removing ${targetDirectory}`);
    throw error;
  }
};

export default createPackage;
