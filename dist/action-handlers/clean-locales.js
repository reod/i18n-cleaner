"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanLocales_1 = require("./../use-cases/clean-locales/CleanLocales");
const Command_1 = require("./../use-cases/clean-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const CleaningService_1 = require("./../services/cleaning/CleaningService");
async function cleanLocales(directory, refFile, options) {
    const fillMissing = options.fillMissing || false;
    const sort = options.sort || false;
    const save = options.save || false;
    const cleanLocales = new CleanLocales_1.CleanLocales(new FileSystemService_1.FileSystemService(), new CleaningService_1.CleaningService());
    const command = new Command_1.Command(directory, refFile, fillMissing, sort, save);
    await cleanLocales.execute(command, {
        localesCleaned(refLocale, cleanedLocales) {
            console.log('cleaned...', refLocale, cleanedLocales);
        },
        cannotCleanLocales(e) {
            console.log(e);
        }
    });
}
exports.cleanLocales = cleanLocales;
;
//# sourceMappingURL=clean-locales.js.map