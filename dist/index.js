#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const command_handler_1 = require("./commands/command-handler");
program
    .version('0.1.0')
    .option('-l, --list', 'List available locales', command_handler_1.handleCommand('ListLocales'))
    .parse(process.argv);
//# sourceMappingURL=index.js.map