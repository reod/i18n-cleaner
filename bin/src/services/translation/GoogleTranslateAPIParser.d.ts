export declare type GoogleTranslateAPIResponse = [[[string, string, string, string, number]], string, string];
export declare class GoogleTranslateAPIParser {
    private separator;
    constructor(separator: string);
    parse(response: GoogleTranslateAPIResponse): Array<string>;
    extractTranslations(response: GoogleTranslateAPIResponse | Array<any>): Array<any>;
    getTranslatedValues(translations: Array<string>): Array<string>;
}
