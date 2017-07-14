"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const readdirP = util_1.promisify(fs_1.readdir);
class CleanLocales {
    execute(directory, fillMissing, sort, save) {
        console.log('clean');
    }
}
exports.CleanLocales = CleanLocales;
//# sourceMappingURL=CleanLocales.js.map