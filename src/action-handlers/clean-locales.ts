import { CleanLocales } from './../use-cases/clean-locales/CleanLocales';
import { Command } from './../use-cases/clean-locales/Command';
import { Responder } from './../use-cases/clean-locales/Responder';
import { FileSystemService } from './../services/file-system/FileSystemService';
import { CleaningService } from './../services/cleaning/CleaningService';

export async function cleanLocales(directory: string, refFile: string, options: any) {
  const fillMissing = options.fillMissing || false;
  const sort = options.sort || false;
  const save = options.save || false;

  const cleanLocales = new CleanLocales(new FileSystemService(), new CleaningService());
  const command = new Command(directory, refFile, fillMissing, sort, save);

  await cleanLocales.execute(command, <Responder> {
    localesCleaned(refLocale: any, cleanedLocales: Array<any>) {
      console.log('cleaned...', refLocale, cleanedLocales);
    },

    cannotCleanLocales(e: Error) {
      console.log(e);
    }
  });
};
