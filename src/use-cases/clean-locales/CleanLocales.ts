import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { CleaningService } from './../../services/cleaning/CleaningService';


export class CleanLocales implements UseCase {

  constructor(
    private fsService: FileSystemService,
    private cService: CleaningService) {}

  async execute(command: Command, responder: Responder): Promise<void> {
    const files = await this.fsService.getFiles(command.directory);
    const isBasefFile = (file: string) => this.fsService.getFileName(file) === command.baseLocale;
    const baseLocalePath = files.find(isBasefFile);

    if (!baseLocalePath) {
      responder.cannotCleanLocales(new Error('Base file invalid.'));
      return;
    }

    const localesToCleanPaths = files.filter(file => !isBasefFile(file));

    if (localesToCleanPaths.length === 0) {
      responder.cannotCleanLocales(new Error('No locales to clean.'));
    }

    const refLocale = await this.fsService.getFileContentAsObj(baseLocalePath);
    const getContentAsObj = this.fsService.getFileContentAsObj.bind(this.fsService);
    let localesToClean = await Promise.all(
      localesToCleanPaths.map(getContentAsObj)
    );

    if (command.fillMissing) {
      localesToClean = this.getFilledLocales(refLocale, localesToClean);
    }

    if (command.sort) {
      localesToClean = this.getSortedLocales(refLocale, localesToClean);
    }

    if (command.save) {
      try {
        await this.saveLocales(localesToCleanPaths, localesToClean);
      } catch (e) {
        responder.cannotCleanLocales(e);
      }
    }

    responder.localesCleaned(refLocale, localesToClean);
  }

  private getFilledLocales(refLocale: any, localesToClean: any[]): any[] {
    return this.cService.fillMissingFields(refLocale, localesToClean);
  }

  private getSortedLocales(refLocale: any, localesToClean: any[]): any[] {
    return this.cService.sortFields(refLocale, localesToClean);
  }

  private async saveLocales(paths: string[], locales: any[]) {
    for (let i = 0, l = paths.length; i < l; i++) {
        const path = paths[i];
        const content = locales[i];

        await this.fsService.saveContentToFile(path, content);
      }
  }
}
