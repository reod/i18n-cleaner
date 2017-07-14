#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const ListLocales_1 = require("./commands/list-locales/ListLocales");
const FileSystemService_1 = require("./services/file-system/FileSystemService");
const CleanLocales_1 = require("./commands/clean-locales/CleanLocales");
program
    .command('list [directory]')
    .description('List available locales')
    .alias('l')
    .action(function (path) {
    const dir = path || './';
    new ListLocales_1.ListLocales(new FileSystemService_1.FileSystemService()).execute(dir);
});
program
    .command('clean [directory]')
    .description('Clean locales')
    .alias('c')
    .option('-f, --fill-missing', 'Fill missing keys based on reference file')
    .option('-a, --sort', 'Sort keys based on reference file')
    .option('-s, --save', 'Write result to files')
    .action(function (directory, options) {
    directory = directory || './';
    const fillMissing = options.fill_missing || false;
    const sort = options.sort || false;
    const save = options.save || false;
    new CleanLocales_1.CleanLocales().execute(directory, fillMissing, sort, save);
});
program
    .version('0.1.0')
    .parse(process.argv);
//# sourceMappingURL=index.js.map