"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanLocales_1 = require("./../use-cases/clean-locales/CleanLocales");
const Command_1 = require("./../use-cases/clean-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const CleaningService_1 = require("./../services/cleaning/CleaningService");
function cleanLocales(directory, options) {
    directory = directory || './';
    const fillMissing = options.fillMissing || false;
    const sort = options.sort || false;
    const save = options.save || false;
    const cleanLocales = new CleanLocales_1.CleanLocales(new FileSystemService_1.FileSystemService(), new CleaningService_1.CleaningService());
    const command = new Command_1.Command(directory, fillMissing, sort, save);
    cleanLocales.execute(command, {
        localesCleaned() {
            console.log('cleaned...');
        },
        cannotGetLocales(e) {
            console.log('canot get locales');
        },
        cannotSaveLocales(e) {
            console.log('cannot save locles.');
        }
    });
}
exports.cleanLocales = cleanLocales;
;
//# sourceMappingURL=clean-locales.js.map