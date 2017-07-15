
import { ListLocales } from './../use-cases/list-locales/ListLocales';
import { Command } from './../use-cases/list-locales/Command';
import { Responder } from './../use-cases/list-locales/Responder';

import { FileSystemService } from './../services/file-system/FileSystemService';

export function listLocales(path: string) {
  path = path || './';
  const listLocales = new ListLocales(new FileSystemService());

  listLocales.execute(new Command(path), <Responder> {
    localesFound(files) {
      files.forEach(file => {
        console.log(file);
      });
    },
    cannotGetLocales(e) {
      console.log(e);
    }
  });

};
