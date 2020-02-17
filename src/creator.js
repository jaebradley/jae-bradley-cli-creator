import untildify from 'untildify';
import fse from 'fs-extra';
import { spawn } from 'child-process-promise';
import normalizePackageData from 'normalize-package-data';
import sortPackageJSON from 'sort-package-json';
import isOnline from 'is-online';
import chalk from 'chalk';

// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';

import prompts from './prompts';
import writeTemplateFiles from './writeTemplateFiles';

const creator = async () => {
  const online = await isOnline();

  if (!online) {
    console.log(chalk.bold.redBright("⛔ 📡  You don't seem to be online"));
    return;
  }

  const {
    packageName,
    packageDescription,
    targetDirectory,
    authorEmailAddress,
    gitHubUsername,
  } = await prompts();

  const destinationDirectory = untildify(targetDirectory);
  const templateValues = Object.freeze({
    packageName,
    packageDescription,
    gitHubUsername,
    packageAuthor: authorEmailAddress,
  });

  await writeTemplateFiles({
    templateValues,
    location: path.resolve(__dirname, './templates'),
    destination: destinationDirectory,
  });


  const packageJSONLocation = `${destinationDirectory}/package.json`;
  const packageJSON = fse.readJsonSync(packageJSONLocation, 'utf8');

  normalizePackageData(packageJSON);
  fse.writeJsonSync(packageJSONLocation, sortPackageJSON(packageJSON), 'utf8');

  console.log(chalk.bold.cyanBright('⌛ 🤞 Installing packages'));
  await spawn('npm', ['install'], { cwd: destinationDirectory, stdio: 'inherit' });
  await spawn('git', ['init'], { cwd: destinationDirectory, stdio: 'inherit' });

  console.log(chalk.bold.magentaBright('Installation complete!'));
  console.log();

  console.log(`🎭  ${chalk.bold.magentaBright('Run')} ${chalk.bold.blueBright('jest')} ${chalk.bold.magentaBright('tests')}: ${chalk.bold.cyanBright('npm run test')} `);
  console.log(`🏗️  ${chalk.bold.magentaBright('Build')} ${chalk.bold.blueBright('rollup.js')} ${chalk.bold.magentaBright('cli')}: ${chalk.bold.cyanBright('npm run build:production')}`);
  console.log(`👕  ${chalk.bold.magentaBright('Run')} ${chalk.bold.blueBright('eslint')}: ${chalk.bold.cyanBright('npm run lint')}`);

  console.log();
  console.log(chalk.bold.yellowBright("⚠️  Don't forget to... ⚠️"));
  console.log(chalk.bold.cyanBright('✅  Add a license'));
  console.log(chalk.bold.cyanBright('✅  Add keywords to package.json'));
  console.log(chalk.bold.cyanBright('✅  Create GitHub repository'));
  console.log(chalk.bold.cyanBright('✅  Setup Travis CI for repository'));
};

export default creator;
