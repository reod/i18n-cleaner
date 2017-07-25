import { TranslateLocales } from './../use-cases/translate-locales/TranslateLocales';
import { GoogleTranslationService } from './../services/translation/GoogleTranslationService';
import { GoogleTranslateAPIParser } from './../services/translation/GoogleTranslateAPIParser';
import { Command } from './../use-cases/translate-locales/Command';
import { Responder } from './../use-cases/translate-locales/Responder';
import { FileSystemService } from './../services/file-system/FileSystemService';
import { OnlyJsonSanitizeStrategy } from './../services/file-system/OnlyJsonSanitizeStrategy';


export async function translateLocales(baseLocalePath: string, sourceLng: string, targetLng: string, options: any) {
  const overrideExisting = options.overrideExisting || false;
  const outputFileName = options.outputFileName || `${targetLng}.json`;
  const save = options.save || false;

  const translateLocalesUC = new TranslateLocales(
    new FileSystemService(new OnlyJsonSanitizeStrategy()),
    new GoogleTranslationService(new GoogleTranslateAPIParser(GoogleTranslationService.BATH_REQ_SEP))
  );

  const command = new Command(
    baseLocalePath, sourceLng, targetLng,
    overrideExisting, outputFileName, save
  );

  await translateLocalesUC.execute(command, {
    localesTranslated(base: any, translated: any[]): void {
      console.log('Locale translated.');
      // console.log('source:');
      // console.log(base);
      console.log('translated:');
      console.log(translated);
    },

    cannotTranslateLocales(e: Error) {
      console.log('Cannot translate locale', e.message);
    }
  } as Responder);
}
