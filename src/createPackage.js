import fs from 'fs-extra';
import { exec } from 'child-process-promise';
import untildify from 'untildify';

import promptTargetDirectory from './prompters/promptTargetDirectory';
import promptPackageName from './prompters/promptPackageName';
import promptGitHubUsername from './prompters/promptGitHubUsername';
import promptPackageDescription from './prompters/promptPackageDescription';
import generatePackageJSON from './generatePackageJSON';

const filesToCopy = Object.freeze([
  {
    targetFilePath: '.babelrc',
    sourcedFilePath: './build/files/.babelrc',
  },
  {
    targetFilePath: '.eslintignore',
    sourcedFilePath: './build/files/.eslintignore',
  },
  {
    targetFilePath: '.eslintrc',
    sourcedFilePath: './build/files/.eslintrc',
  },
  {
    targetFilePath: '.gitignore',
    sourcedFilePath: './build/files/.gitignore',
  },
  {
    targetFilePath: '.travis.yml',
    sourcedFilePath: './build/files/.travis.yml',
  },
  {
    targetFilePath: 'commitlint.config.js',
    sourcedFilePath: './build/files/commitlint.config.js',
  },
]);

const filesToCreate = Object.freeze([
  'LICENSE',
  'README.md',
]);

const createPackage = async () => {
  let { targetDirectory } = await promptTargetDirectory();
  const { packageName } = await promptPackageName();
  const { packageDescription } = await promptPackageDescription();
  const { gitHubUserName } = await promptGitHubUsername();

  const generatedPackageJSON = generatePackageJSON({
    name: packageName,
    description: packageDescription,
    gitHubUserName,
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
    await fs.outputFile(`${targetDirectory}/package.json`, generatedPackageJSON);
    console.log('Created package.json!');
  } catch (error) {
    console.error('Could not create package.json');
    throw error;
  }

  filesToCopy.forEach(async ({ targetFilePath, sourcedFilePath }) => {
    let content;
    try {
      const rawContent = await fs.readFile(sourcedFilePath);
      content = rawContent.toString();
      console.log(`Copied content from ${sourcedFilePath}!`);
    } catch (error) {
      console.error(`Could not copy content from ${sourcedFilePath}`);
      throw error;
    }

    const filePath = `${targetDirectory}/${targetFilePath}`;
    try {
      await fs.outputFile(filePath, content);
      console.log(`Copied content to ${filePath}!`);
    } catch (error) {
      console.error(`Could not copy contents to ${filePath}`);
      throw error;
    }
  });

  filesToCreate.forEach(async (targetFilePath) => {
    const filePath = `${targetDirectory}/${targetFilePath}`;

    try {
      await fs.outputFile(filePath);
      console.log(`Created ${filePath}!`);
    } catch (error) {
      console.error(`Could not create ${filePath}`);
      throw error;
    }
  });

  try {
    await exec(`cd ${targetDirectory}; npm install`);
    console.log(`Navigated to ${targetDirectory} and ran npm install!`);
  } catch (error) {
    console.error(`Failed to navigate to ${targetDirectory} and run npm install`);
    throw error;
  }
};

export default createPackage;
