#!/usr/bin/env node

import * as program from 'commander';

import { listLocales } from './action-handlers/list-locales';
import { cleanLocales } from './action-handlers/clean-locales';


program
  .command('list [directory]')
  .description('List available locales')
  .alias('l')
  .action(listLocales);

program
  .command('clean <directory> <base-locale>')
  .description('Clean locales')
  .alias('c')
  .option('-f, --fill-missing', 'Fill missing keys based on base locale')
  .option('-a, --sort', 'Sort keys based on base locale')
  .option('-s, --save', 'Write result to files (creates backup by default)')
  .action(cleanLocales);

program
  .version('0.1.0')
  .parse(process.argv);
