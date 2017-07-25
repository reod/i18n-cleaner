"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListLocales_1 = require("./../use-cases/list-locales/ListLocales");
const Command_1 = require("./../use-cases/list-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const OnlyJsonSanitizeStrategy_1 = require("./../services/file-system/OnlyJsonSanitizeStrategy");
function listLocales(path) {
    path = path || './';
    const listLocalesUC = new ListLocales_1.ListLocales(new FileSystemService_1.FileSystemService(new OnlyJsonSanitizeStrategy_1.OnlyJsonSanitizeStrategy()));
    listLocalesUC.execute(new Command_1.Command(path), {
        localesFound(files) {
            files.forEach(file => {
                console.log(file);
            });
        },
        cannotGetLocales(e) {
            console.log('Cannot list locales: ', e.message);
        }
    });
}
exports.listLocales = listLocales;
//# sourceMappingURL=list-locales.js.map