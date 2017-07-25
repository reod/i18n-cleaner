export declare type GoogleTranslateAPIResponse = [[[string, string, string, string, number]], string, string];
export declare class GoogleTranslateAPIParser {
    private separator;
    constructor(separator: string);
    parse(response: GoogleTranslateAPIResponse): string[];
    extractTranslations(response: GoogleTranslateAPIResponse | any[]): any[];
    getTranslatedValues(translations: string[]): string[];
}
