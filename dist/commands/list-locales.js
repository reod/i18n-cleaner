"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const readdirP = util_1.promisify(fs_1.readdir);
class ListLocales {
    constructor() {
        this.path = './';
        this.execute = async () => {
            const files = await readdirP(this.path);
            files.forEach((file) => {
                console.log(file);
            });
        };
    }
}
exports.ListLocales = ListLocales;
//# sourceMappingURL=list-locales.js.map