"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListLocales_1 = require("./list-locales/ListLocales");
const CleanLocales_1 = require("./clean-locales/CleanLocales");
;
;
exports.emptyExecutor = (...args) => {
    console.log('No executor found.');
    return null;
};
const commands = new Map([
    ['ListLocales', new ListLocales_1.ListLocales()],
    ['CleanLocales', new CleanLocales_1.CleanLocales()]
]);
exports.handleCommand = function (name) {
    const command = commands.get(name);
    return command ? command.execute : exports.emptyExecutor;
};
//# sourceMappingURL=command-handler.js.map