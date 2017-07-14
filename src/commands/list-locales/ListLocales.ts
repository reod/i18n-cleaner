import { Command } from './../Command'
import { readdir } from 'fs';
import { promisify } from 'util';
const readdirP = promisify(readdir);


export class ListLocales implements Command {
  path = './';

  execute = async () => {
    const files = await readdirP(this.path);

    files.forEach((file: string) => {
      console.log(file);
    });
  }
}
