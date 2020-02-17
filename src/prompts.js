import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import validateNpmPackageName from 'validate-npm-package-name';
import chalk from 'chalk';

import isGitHubUsernameValid from 'App/isGitHubUsernameValid';

const prompts = async () => (
  inquirer.prompt([
    {
      name: 'packageName',
      message: chalk.bold.greenBright('📛  Input a package name'),
      type: 'input',
      validate: (packageName) => validateNpmPackageName(packageName).validForNewPackages || chalk.bold.redBright(`😞  ${packageName} is an invalid package name`),
    },
    {
      name: 'packageDescription',
      message: chalk.bold.redBright('🏷️  Input a package description'),
      type: 'input',
      validate: (answer) => answer && answer.length > 0,
    },
    {
      name: 'targetDirectory',
      message: chalk.bold.magentaBright('📍  Input the relative package location'),
      type: 'input',
      validate: (answer) => answer && answer.length > 0,
    },
    {
      name: 'authorEmailAddress',
      message: chalk.bold.cyanBright('📥  Input your email address'),
      type: 'input',
      validate: (emailAddress) => emailValidator.validate(emailAddress) || chalk.bold.redBright(`😞  ${emailAddress} is an invalid email address`),
    },
    {
      name: 'gitHubUsername',
      message: chalk.bold.greenBright('👤  Input your GitHub username'),
      type: 'input',
      validate: async (username) => {
        if (await isGitHubUsernameValid(username)) {
          return true;
        }

        return chalk.bold.redBright(`😞  ${username} is an invalid GitHub username`);
      },
    },
  ])
);

export default prompts;
