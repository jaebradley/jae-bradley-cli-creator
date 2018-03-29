#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import createPackage from '../createPackage';

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
