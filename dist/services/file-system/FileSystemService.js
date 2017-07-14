"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
const readdirAsync = util_1.promisify(fs_1.readdir);
const readFileAsync = util_1.promisify(fs_1.readFile);
class FileSystemService {
    async getFileNames(path) {
        const files = await readdirAsync(path);
        return files;
    }
    async getFileContentAsObj(path) {
        const fileContent = await readFileAsync(path);
        const asObj = JSON.parse(fileContent);
        return asObj;
    }
}
exports.FileSystemService = FileSystemService;
//# sourceMappingURL=FileSystemService.js.map