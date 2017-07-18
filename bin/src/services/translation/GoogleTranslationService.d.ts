import { TranslationService } from './TranslationService';
import { GoogleTranslateAPIParser } from './GoogleTranslateAPIParser';
export declare class GoogleTranslationService implements TranslationService {
    private apiUrl;
    static BATH_REQ_SEP: string;
    private httpClient;
    private apiResponseParser;
    constructor(apiResponseParser: GoogleTranslateAPIParser);
    translate(source: string, target: string, locale: any, overrideExisting?: boolean): Promise<any>;
    getTranslateReqUrl(source: string, target: string, word: string): string;
    getBatchTranslateUrl(source: string, target: string, locale: any): string;
    applyTranslation(translatedValues: Array<string>, locale: any, overrideExisting: boolean): {};
}
