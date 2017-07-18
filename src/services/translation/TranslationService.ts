export interface TranslationService {
  translate(source: string, target: string, locales: any, overrideExisting: boolean): Promise<any>
}
