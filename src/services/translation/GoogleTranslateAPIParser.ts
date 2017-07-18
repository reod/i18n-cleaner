/**
 * Type of response from free Google Translate API used by Google Translate
 * Chrome extension. There is probably no official documentation of it
 * on the internet, so this is only a aproximation.
 * 
 */
export type GoogleTranslateAPIResponse = [ [ [string, string, string, string, number] ], string, string ];

export class GoogleTranslateAPIParser {
  /**
   * 
   * @param separator Separator used in bath request
   */
  constructor(private separator: string) {}
  
  /**
   * Extract array of words from Google Translate API response
   * @param response JSON response from Google Translate API
   */
  parse(response: GoogleTranslateAPIResponse): Array<string> {
    console.log('ress', response)
    const translations = this.extractTranslations(response);
    console.log('transki', translations)
    const values = this.getTranslatedValues(translations);
    
    return values;
  }

  /**
   * Returns array of translation chunks
   * @param response JSON response from Google Translate API
   */
  extractTranslations(response: GoogleTranslateAPIResponse | Array<any>): Array<any> {
    const [first] = response;

    if (!Array.isArray(first)) {
      return first;
    }

    return first.map(this.extractTranslations);
  }

  /**
   * Returns array of values translated by Google
   * @param translations Array of translation chunks extracted by `extractTranslations` function
   */
  getTranslatedValues(translations: Array<string>): Array<string> {
    return translations
      .join('')
      .split(this.separator)
      .map(value => {
        return value.replace(/^\s|\s$/igm, '');
      });
  }
}
