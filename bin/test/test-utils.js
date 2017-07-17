"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const writeFileAsync = util_1.promisify(fs_1.writeFile);
const unlinkAsync = util_1.promisify(fs_1.unlink);
function getPlaygroundPath() {
    return path_1.join('./test', 'playground');
}
exports.getPlaygroundPath = getPlaygroundPath;
;
function getPlaygroundFiles() {
    return [
        {
            name: 'en.json',
            content: {
                "language": "English",
                "capitol": "London",
                "units": {
                    "time_hour": "hour",
                    "currency": "GBP",
                    "drink": "tea"
                }
            }
        },
        {
            name: 'pl.json',
            content: {
                "language": "Polski",
                "capitol": "Warszawa",
                "units": {
                    "time_hour": "godzina",
                    "currency": "PLN"
                }
            }
        }
    ];
}
exports.getPlaygroundFiles = getPlaygroundFiles;
;
function getPlaygroundFilesPaths() {
    return getPlaygroundFiles().map(file => path_1.join(getPlaygroundPath(), file.name));
}
exports.getPlaygroundFilesPaths = getPlaygroundFilesPaths;
;
function createSamplePath() {
    return path_1.join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win');
}
exports.createSamplePath = createSamplePath;
;
async function createPlayground() {
    await Promise.all(getPlaygroundFiles()
        .map(file => {
        const path = path_1.join(getPlaygroundPath(), file.name);
        const content = JSON.stringify(file.content, null, 2);
        return writeFileAsync(path, content);
    }));
}
exports.createPlayground = createPlayground;
;
function clearPlayground() {
    return Promise.all(getPlaygroundFiles()
        .map(file => {
        const path = path_1.join(getPlaygroundPath(), file.name);
        return unlinkAsync(path);
    }));
}
exports.clearPlayground = clearPlayground;
;
//# sourceMappingURL=test-utils.js.map