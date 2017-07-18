"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flat_1 = require("flat");
const axios_1 = require("axios");
const httpAdapter = require('axios/lib/adapters/http');
class GoogleTranslationService {
    constructor(apiResponseParser) {
        this.apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx';
        this.httpClient = axios_1.default;
        this.apiResponseParser = apiResponseParser;
        axios_1.default.defaults.adapter = httpAdapter;
    }
    async translate(source, target, locale, overrideExisting = false) {
        const url = this.getBatchTranslateUrl(source, target, locale);
        const { data: response } = await this.httpClient.get(url);
        const translation = this.apiResponseParser.parse(response);
        const translatedLocale = this.applyTranslation(translation, locale, overrideExisting);
        return translatedLocale;
    }
    getTranslateReqUrl(source, target, word) {
        return `${this.apiUrl}&sl=${source}&tl=${target}&dt=t&q=${encodeURI(word)}`;
    }
    getBatchTranslateUrl(source, target, locale) {
        const flattenLocale = flat_1.flatten(locale);
        const baseUrl = this.getTranslateReqUrl(source, target, '');
        const url = Object.keys(flattenLocale).reduce((keysStr, key, i, all) => {
            keysStr += encodeURI(flattenLocale[key]);
            keysStr += i === all.length - 1 ? '' : GoogleTranslationService.BATH_REQ_SEP;
            return keysStr;
        }, baseUrl);
        console.log('urreeke', url);
        return url;
    }
    applyTranslation(translatedValues, locale, overrideExisting) {
        const flattenOryginal = flat_1.flatten(locale);
        const translated = flat_1.flatten(locale);
        Object.keys(flattenOryginal)
            .forEach((key, i) => {
            console.log('gona replace', translated[key], 'with', translatedValues[i]);
            if (overrideExisting || translated[key] !== translatedValues[i]) {
                translated[key] = translatedValues[i];
            }
        });
        return flat_1.unflatten(translated);
    }
}
GoogleTranslationService.BATH_REQ_SEP = '~';
exports.GoogleTranslationService = GoogleTranslationService;
//# sourceMappingURL=GoogleTranslationService.js.map