#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const list_locales_1 = require("./action-handlers/list-locales");
const clean_locales_1 = require("./action-handlers/clean-locales");
program
    .command('list [directory]')
    .description('List available locales')
    .alias('l')
    .action(list_locales_1.listLocales);
program
    .command('clean <directory> <base-locale>')
    .description('Clean locales')
    .alias('c')
    .option('-f, --fill-missing', 'Fill missing keys based on base locale')
    .option('-a, --sort', 'Sort keys based on base locale')
    .option('-s, --save', 'Write result to files (creates backup by default)')
    .action(clean_locales_1.cleanLocales);
program
    .version('0.1.0')
    .parse(process.argv);
//# sourceMappingURL=i18n-manager.js.map