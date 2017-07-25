"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TranslateLocales_1 = require("./../use-cases/translate-locales/TranslateLocales");
const GoogleTranslationService_1 = require("./../services/translation/GoogleTranslationService");
const GoogleTranslateAPIParser_1 = require("./../services/translation/GoogleTranslateAPIParser");
const Command_1 = require("./../use-cases/translate-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const OnlyJsonSanitizeStrategy_1 = require("./../services/file-system/OnlyJsonSanitizeStrategy");
async function translateLocales(baseLocalePath, sourceLng, targetLng, options) {
    const overrideExisting = options.overrideExisting || false;
    const outputFileName = options.outputFileName || `${targetLng}.json`;
    const save = options.save || false;
    const translateLocalesUC = new TranslateLocales_1.TranslateLocales(new FileSystemService_1.FileSystemService(new OnlyJsonSanitizeStrategy_1.OnlyJsonSanitizeStrategy()), new GoogleTranslationService_1.GoogleTranslationService(new GoogleTranslateAPIParser_1.GoogleTranslateAPIParser(GoogleTranslationService_1.GoogleTranslationService.BATH_REQ_SEP)));
    const command = new Command_1.Command(baseLocalePath, sourceLng, targetLng, overrideExisting, outputFileName, save);
    await translateLocalesUC.execute(command, {
        localesTranslated(base, translated) {
            console.log('Locale translated.');
            console.log('translated:');
            console.log(translated);
        },
        cannotTranslateLocales(e) {
            console.log('Cannot translate locale', e.message);
        }
    });
}
exports.translateLocales = translateLocales;
//# sourceMappingURL=translate-locales.js.map