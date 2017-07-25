
import { ListLocales } from './../use-cases/list-locales/ListLocales';
import { Command } from './../use-cases/list-locales/Command';
import { Responder } from './../use-cases/list-locales/Responder';

import { FileSystemService } from './../services/file-system/FileSystemService';
import { OnlyJsonSanitizeStrategy } from './../services/file-system/OnlyJsonSanitizeStrategy';

export function listLocales(path: string) {
  path = path || './';
  const listLocalesUC = new ListLocales(new FileSystemService(new OnlyJsonSanitizeStrategy()));

  listLocalesUC.execute(new Command(path), {
    localesFound(files) {
      files.forEach(file => {
        console.log(file);
      });
    },
    cannotGetLocales(e) {
      console.log('Cannot list locales: ', e.message);
    }
  } as Responder);

}
