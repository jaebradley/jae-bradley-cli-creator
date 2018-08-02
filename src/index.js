import program from 'commander';

import creator from './creator';
import pkg from '../package.json';

program.version(pkg.version)
  .description('CLI that creates starting point for CLI npm packages')
  .parse(process.argv);

creator();
