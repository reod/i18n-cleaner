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
    const refFilePath = files.find(isRefFile);

    if (!refFilePath) {
      responder.cannotCleanLocales(new Error('Reference file invalid.'));
      return;
    }

    const filesToCleanPaths = files.filter(file => !isRefFile(file));

    if (filesToCleanPaths.length === 0) {
      responder.cannotCleanLocales(new Error('No locales to clean.'));
    }

    const refLocale = await this.fsService.getFileContentAsObj(refFilePath);
    const localesToClean = await Promise.all(
      filesToCleanPaths.map(this.fsService.getFileContentAsObj.bind(this.fsService))
    );

    const localesWithSortedFields = this.cService.sortFields(refLocale, localesToClean);

    responder.localesCleaned(refLocale, localesWithSortedFields);
  }
}
