"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoogleTranslateAPIParser {
    constructor(separator) {
        this.separator = separator;
    }
    parse(response) {
        console.log('ress', response);
        const translations = this.extractTranslations(response);
        console.log('transki', translations);
        const values = this.getTranslatedValues(translations);
        return values;
    }
    extractTranslations(response) {
        const [first] = response;
        if (!Array.isArray(first)) {
            return first;
        }
        return first.map(this.extractTranslations);
    }
    getTranslatedValues(translations) {
        return translations
            .join('')
            .split(this.separator)
            .map(value => {
            return value.replace(/^\s|\s$/igm, '');
        });
    }
}
exports.GoogleTranslateAPIParser = GoogleTranslateAPIParser;
//# sourceMappingURL=GoogleTranslateAPIParser.js.map