import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';


export class AllButNotGitKeepSanitizeStrategy implements FileListSanitizeStrategy {
  sanitize(files: string[]): string[] {
    return files.filter(name => name && !/\.gitkeep$/ig.test(name));
  }
}
