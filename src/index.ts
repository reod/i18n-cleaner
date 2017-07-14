#!/usr/bin/env node

import * as program from 'commander';
import { Command } from './commands/Command';
import { ListLocales } from './commands/list-locales/ListLocales';
import { FileSystemService } from './services/file-system/FileSystemService';

import { CleanLocales } from './commands/clean-locales/CleanLocales';


program
  .command('list [directory]')
  .description('List available locales')
  .alias('l')
  .action(function(path) {
    const dir = path || './';
    new ListLocales(new FileSystemService()).execute(dir);
  });

program
  .command('clean [directory]')
  .description('Clean locales')
  .alias('c')
  .option('-f, --fill-missing', 'Fill missing keys based on reference file')
  .option('-a, --sort', 'Sort keys based on reference file')
  .option('-s, --save', 'Write result to files')
  .action(function(directory, options) {
    directory = directory || './';
    const fillMissing = options.fill_missing || false;
    const sort = options.sort || false;
    const save = options.save || false;

    new CleanLocales().execute(directory, fillMissing, sort, save);
  });

program
  .version('0.1.0')
  .parse(process.argv);
