"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = require("path");
const readdirAsync = util_1.promisify(fs_1.readdir);
const readFileAsync = util_1.promisify(fs_1.readFile);
class FileSystemService {
    async getFiles(path) {
        const files = await readdirAsync(path);
        const filesWithPath = files.map((file) => path_1.join(path, file));
        return filesWithPath;
    }
    getFileName(path) {
        const parts = path.split(path_1.sep);
        return parts[parts.length - 1];
    }
    async getFileNames(path) {
        const files = await this.getFiles(path);
        const names = files.map(this.getFileName);
        return names;
    }
    async getFileContentAsObj(path) {
        const fileContent = await readFileAsync(path);
        const asObj = JSON.parse(fileContent);
        return asObj;
    }
}
exports.FileSystemService = FileSystemService;
//# sourceMappingURL=FileSystemService.js.map