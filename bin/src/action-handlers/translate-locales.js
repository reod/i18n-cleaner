"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TranslateLocales_1 = require("./../use-cases/translate-locales/TranslateLocales");
const GoogleTranslationService_1 = require("./../services/translation/GoogleTranslationService");
const Command_1 = require("./../use-cases/translate-locales/Command");
const FileSystemService_1 = require("./../services/file-system/FileSystemService");
const OnlyJsonSanitizeStrategy_1 = require("./../services/file-system/OnlyJsonSanitizeStrategy");
async function translateLocales() {
    const fsService = new FileSystemService_1.FileSystemService(new OnlyJsonSanitizeStrategy_1.OnlyJsonSanitizeStrategy());
    const tService = new GoogleTranslationService_1.GoogleTranslationService();
    const translateLocales = new TranslateLocales_1.TranslateLocales(tService);
    const pl = await fsService.getFileContentAsObj('test/playground/en.json');
    const command = new Command_1.Command([pl], 'en', 'pl', false, false);
    await translateLocales.execute(command, {
        localesTranslated(base, translated) {
            console.log('i18n files cleaned.');
            console.log('base file:');
            console.log(base);
            console.log('cleaned files:');
            console.log(translated);
        },
        cannotTranslateLocales(e) {
            console.log(e);
        }
    });
}
exports.translateLocales = translateLocales;
;
//# sourceMappingURL=translate-locales.js.map