"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListLocales_1 = require("./list-locales/ListLocales");
const noop = function () { };
const commands = new Map();
commands.set('ListLocales', new ListLocales_1.ListLocales());
function handleCommand(name) {
    const executor = commands.get(name).execute || noop;
    return executor;
}
exports.handleCommand = handleCommand;
;
//# sourceMappingURL=command-handler.js.map