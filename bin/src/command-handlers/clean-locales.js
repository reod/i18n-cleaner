"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanLocales_1 = require("./../use-cases/clean-locales/CleanLocales");
const Command_1 = require("./../use-cases/clean-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const OnlyJsonSanitizeStrategy_1 = require("./../services/file-system/OnlyJsonSanitizeStrategy");
const CleaningService_1 = require("./../services/cleaning/CleaningService");
async function cleanLocales(directory, baseLocale, options) {
    const fillMissing = options.fillMissing || false;
    const sort = options.sort || false;
    const save = options.save || false;
    const cleanLocales = new CleanLocales_1.CleanLocales(new FileSystemService_1.FileSystemService(new OnlyJsonSanitizeStrategy_1.OnlyJsonSanitizeStrategy()), new CleaningService_1.CleaningService());
    const command = new Command_1.Command(directory, baseLocale, fillMissing, sort, save);
    await cleanLocales.execute(command, {
        localesCleaned(baseLocale, cleanedLocales) {
            console.log('i18n files cleaned.');
            console.log('base file:');
            console.log(baseLocale);
            console.log('cleaned files:');
            console.log(cleanedLocales);
        },
        cannotCleanLocales(e) {
            console.log('Cannot clean locales:', e.message);
        }
    });
}
exports.cleanLocales = cleanLocales;
;
//# sourceMappingURL=clean-locales.js.map