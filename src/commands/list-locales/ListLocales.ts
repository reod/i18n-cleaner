import { Command } from './../Command';
import { FileSystemService } from './../../services/file-system/FileSystemService';


export class ListLocales implements Command {

  constructor(private fsService: FileSystemService) {}

  execute = async (path: string) => {
    const files = await this.fsService.getFileNames(path);

    files.forEach(file => {
      console.log(file);
    });
  }
}
