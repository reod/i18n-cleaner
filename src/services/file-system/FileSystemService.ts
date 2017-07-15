import { promisify } from 'util';
import { readdir, readFile } from 'fs';
import { join, sep } from 'path';

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);


export class FileSystemService {

  async getFiles(path: string): Promise<Array<string>> {
    const files = await readdirAsync(path);
    const filesWithPath = files.map((file: string) => join(path, file));

    return filesWithPath;
  }

  getFileName(path: string): string {
    const parts = path.split(sep);
    return parts[parts.length -1];
  }

  async getFileNames(path: string): Promise<Array<string>> {
    const files = await this.getFiles(path);
    const names = files.map(this.getFileName);
    
    return names;
  }

  async getFileContentAsObj(path: string): Promise<Object> {
    const fileContent = await readFileAsync(path);
    const asObj = JSON.parse(fileContent);

    return asObj;
  }

}