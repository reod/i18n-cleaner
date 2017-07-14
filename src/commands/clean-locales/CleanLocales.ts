import { Command } from './../Command'
import { readdir } from 'fs';
import { promisify } from 'util';
const readdirP = promisify(readdir);


export class CleanLocales implements Command {

  execute(directory: string, fillMissing: Boolean, sort: Boolean, save: Boolean): void {
    console.log('clean')
  }
}
