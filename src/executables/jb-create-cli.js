#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('CLI that creates starting point for CLI npm packages')
  .command('create', 'Create a CLI')
  .parse(process.argv);
