import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';


export class OnlyJsonSanitizeStrategy implements FileListSanitizeStrategy {
  sanitize(files: string[]): string[] {
    return files.filter(name => /\w+.json$/ig.test(name));
  }
}
