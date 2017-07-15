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
    const isRefFile = (file: string) => this.fsService.getFileName(file) === command.referenceFileName;
    const refLocalePath = files.find(isRefFile);

    if (!refLocalePath) {
      responder.cannotCleanLocales(new Error('Reference file invalid.'));
      return;
    }

    const localesToCleanPaths = files.filter(file => !isRefFile(file));

    if (localesToCleanPaths.length === 0) {
      responder.cannotCleanLocales(new Error('No locales to clean.'));
    }

    const refLocale = await this.fsService.getFileContentAsObj(refLocalePath);
    const getContentAsObj = this.fsService.getFileContentAsObj.bind(this.fsService);
    let localesToClean = await Promise.all(
      localesToCleanPaths.map(getContentAsObj)
    );

    if (command.fillMissing) {
      localesToClean = await this.getFilledLocales(refLocale, localesToClean);
    }
    
    if (command.sort) {
      localesToClean = await this.getSortedLocales(refLocale, localesToClean);
    }
    
    responder.localesCleaned(refLocale, localesToClean);
  }

  private async getFilledLocales(refLocale: any, localesToClean: Array<any>): Promise<Array<any>> {
    return this.cService.fillMissingFields(refLocale, localesToClean);
  }

  private async getSortedLocales(refLocale: any, localesToClean: Array<any>): Promise<Array<any>> {
    return this.cService.sortFields(refLocale, localesToClean);
  }
}
