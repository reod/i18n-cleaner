#!/usr/bin/env node

import * as program from 'commander';
import { Command } from './commands/Command';
import { handleCommand } from './commands/command-handler';


program
  .version('0.1.0')
  .option('-l, --list', 'List available locales', handleCommand('ListLocales'))
  .parse(process.argv);
