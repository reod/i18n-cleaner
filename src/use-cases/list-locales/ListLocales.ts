import { Command } from './Command';
import { Responder } from './Responder';
import { UseCase } from './../UseCase';
import { FileSystemService } from './../../services/file-system/FileSystemService';


export class ListLocales implements UseCase {

  constructor(private fsService: FileSystemService) {}

  execute = async (command: Command, responder: Responder) => {
    let files;

    try {
      files = await this.fsService.getFileNames(command.path);
    } catch (e) {
      responder.cannotGetLocales(e);
    }

    responder.localesFound(files);
  }
}
