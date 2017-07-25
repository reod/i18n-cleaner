import { flatten, unflatten } from 'flat';
import axios from 'axios';
const httpAdapter = require('axios/lib/adapters/http');
import { TranslationService } from './TranslationService';
import { GoogleTranslateAPIParser, GoogleTranslateAPIResponse } from './GoogleTranslateAPIParser';


export class GoogleTranslationService implements TranslationService {
  private apiUrl: string = 'https://translate.googleapis.com/translate_a/single?client=gtx';
  public static BATH_REQ_SEP = '~';

  private httpClient: any = axios;
  private apiResponseParser: GoogleTranslateAPIParser;

  constructor(apiResponseParser: GoogleTranslateAPIParser) {
    this.apiResponseParser = apiResponseParser;
    axios.defaults.adapter = httpAdapter;
  }

  /**
   * Translate locale using Google Translate API.
   * @param source Source language
   * @param target Target language
   * @param locale Locale to translate
   * @param overrideExisting Override existing values (default false)
   */
  async translate(source: string, target: string, locale: any,
    overrideExisting: boolean = false): Promise<any> {

    const url = this.getBatchTranslateUrl(source, target, locale);
    const { data: response } = await this.httpClient.get(url);
    const translation = this.apiResponseParser.parse(response);
    const translatedLocale = this.applyTranslation(translation, locale, overrideExisting);

    return translatedLocale;
  }

  /**
   * Returns URL for translating single word.
   * @param source Source language
   * @param target Target language
   * @param word Word to translate
   */
  getTranslateReqUrl(source: string, target: string, word: string): string {
    return `${this.apiUrl}&sl=${source}&tl=${target}&dt=t&q=${encodeURI(word)}`;
  }

  /**
   * Allows to translate many words at once.
   * @param source Source language
   * @param target Target language
   * @param locale Locale to translate
   * @returns URL for batch translation
   */
  getBatchTranslateUrl(source: string, target: string, locale: any): string {
    const flattenLocale: any = flatten(locale);
    const baseUrl = this.getTranslateReqUrl(source, target, '');
    const url = Object.keys(flattenLocale).reduce((keysStr, key, i, all) => {
      keysStr += encodeURI(flattenLocale[key]);
      keysStr += i === all.length -1 ? '' : GoogleTranslationService.BATH_REQ_SEP;

      return keysStr;
    }, baseUrl);
console.log('urreeke', url)
    return url;
  }

  /**
   * Apply array of translated values on locale
   * @param translatedValues Array of values translated by Goggle
   * @param locale Locale to apply values on
   * @param overrideExisting If true, existing values in locale will be replaced by new one.
   */
  applyTranslation(translatedValues: Array<string>, locale: any, overrideExisting: boolean) {
    const flattenOryginal: any = flatten(locale);
    const translated: any = flatten(locale);

    Object.keys(flattenOryginal)
      .forEach((key, i) => {
        console.log('gona replace',translated[key], 'with', translatedValues[i])
        if (overrideExisting || translated[key] !== translatedValues[i]) {
          translated[key] = translatedValues[i];
        }
      });

    return unflatten(translated);
  }

}
