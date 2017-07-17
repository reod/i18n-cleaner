import { FileListSanitizeStrategy } from './FileListSanitizeStrategy'


export class OnlyJsonSanitizeStrategy implements FileListSanitizeStrategy {
  sanitize(files: Array<string>): Array<string> {
    return files.filter(name => /\w+.json$/ig.test(name));
  }
}
