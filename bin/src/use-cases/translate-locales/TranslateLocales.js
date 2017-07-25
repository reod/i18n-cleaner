"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranslateLocales {
    constructor(fsService, tService) {
        this.fsService = fsService;
        this.tService = tService;
    }
    async execute(command, responder) {
        let baseLocale = null;
        if (command.sourceLng === command.targetLng) {
            responder.cannotTranslateLocales(new Error('Source and target language is the same!'));
            return;
        }
        if (!this.validateLocaleCode(command.sourceLng) ||
            !this.validateLocaleCode(command.targetLng)) {
            responder.cannotTranslateLocales(new Error(`Invalid locale code - use two letters, eg. 'en' or 'es'.`));
            return;
        }
        try {
            baseLocale = await this.fsService.getFileContentAsObj(command.baseLocalePath);
        }
        catch (e) {
            responder.cannotTranslateLocales(e);
            return;
        }
        let translated = null;
        try {
            translated = await this.tService.translate(command.sourceLng, command.targetLng, baseLocale, command.overrideExisting);
        }
        catch (e) {
            responder.cannotTranslateLocales(e);
            return;
        }
        responder.localesTranslated(baseLocale, translated);
    }
    validateLocaleCode(locale) {
        if (locale.length === 0)
            return false;
        if (locale.length > 4)
            return false;
        return true;
    }
}
exports.TranslateLocales = TranslateLocales;
//# sourceMappingURL=TranslateLocales.js.map