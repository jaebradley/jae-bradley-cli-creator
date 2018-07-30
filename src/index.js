import program from 'commander';
import createPackage from 'App/createPackage';

import pkg from '../package.json';

const execute = async () => {
  try {
    await createPackage();
  } catch (e) {
    console.error('😞  Rut ro, an error occurred');
    console.error(e);
  }
};

program.version(pkg.version)
  .description('CLI that creates starting point for CLI npm packages')
  .parse(process.argv);

execute();
