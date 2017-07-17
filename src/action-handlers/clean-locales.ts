import { CleanLocales } from './../use-cases/clean-locales/CleanLocales';
import { Command } from './../use-cases/clean-locales/Command';
import { Responder } from './../use-cases/clean-locales/Responder';
import { FileSystemService } from './../services/file-system/FileSystemService';
import { OnlyJsonSanitizeStrategy } from './../services/file-system/OnlyJsonSanitizeStrategy';
import { CleaningService } from './../services/cleaning/CleaningService';

export async function cleanLocales(directory: string, baseLocale: string, options: any) {
  const fillMissing = options.fillMissing || false;
  const sort = options.sort || false;
  const save = options.save || false;

  const cleanLocales = new CleanLocales(
    new FileSystemService(new OnlyJsonSanitizeStrategy()), new CleaningService()
  );
  const command = new Command(directory, baseLocale, fillMissing, sort, save);

  await cleanLocales.execute(command, <Responder> {
    localesCleaned(baseLocale: any, cleanedLocales: Array<any>) {
      console.log('i18n files cleaned.');
      console.log('base file:');
      console.log(baseLocale);
      console.log('cleaned files:');
      console.log(cleanedLocales);
    },

    cannotCleanLocales(e: Error) {
      console.log(e);
    }
  });
};
