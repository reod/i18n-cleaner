import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { CleaningService } from './../../services/cleaning/CleaningService';


export class CleanLocales implements UseCase {

  constructor(
    private fsService: FileSystemService,
    private cService: CleaningService) {}

  execute(command: Command, responder: Responder): void {
    responder.localesCleaned();
    responder.cannotGetLocales(new Error());
    responder.cannotSaveLocales(new Error())
  }
}
