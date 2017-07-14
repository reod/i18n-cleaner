import { promisify } from 'util';
import { readdir, readFile } from 'fs';

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);


export class FileSystemService {

  async getFileNames(path: String): Promise<Array<String>> {
    const files = await readdirAsync(path);
    return files;
  }

  async getFileContentAsObj(path: String): Promise<Object> {
    const fileContent = await readFileAsync(path);
    const asObj = JSON.parse(fileContent);

    return asObj;
  }

}