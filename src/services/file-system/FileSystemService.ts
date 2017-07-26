import { promisify } from 'util';
import { readdir, readFile, writeFile } from 'fs';
import { join, sep } from 'path';
import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);


export class FileSystemService {

  private backupSufix = 'i18n-manager_backup_file';

  constructor(private sStrategy: FileListSanitizeStrategy) {}

  async getFiles(path: string): Promise<string[]> {
    const files = await readdirAsync(path);
    const filesWithPath = files.map((file: string) => join(path, file));
    const sanitized = this.sStrategy.sanitize(filesWithPath);

    return sanitized;
  }

  getFileName(path: string): string {
    const parts = path.split(sep);
    return parts[parts.length - 1];
  }

  async getFileNames(path: string): Promise<string[]> {
    const files = await this.getFiles(path);
    const names = files.map(this.getFileName);

    return names;
  }

  async getFileContentAsObj(path: string): Promise<object> {
    const fileContent = await readFileAsync(path);
    const asObj = JSON.parse(fileContent);

    return asObj;
  }

  async saveContentToFile(path: string, content: any, doBackup: boolean = true) {
    if (doBackup) {
      const backupPath = this.getBackupPath(path);
      const originalContent = await readFileAsync(path);

      await writeFileAsync(backupPath, originalContent);
    }

    const contentAsString = JSON.stringify(content, null, 2);
    await writeFileAsync(path, contentAsString);
  }

  getBackupPath(path: string): string {
    const fileName = this.getFileName(path);
    const backupPath = path.replace(fileName, `${fileName}_${this.backupSufix}`);

    return backupPath;
  }

}
