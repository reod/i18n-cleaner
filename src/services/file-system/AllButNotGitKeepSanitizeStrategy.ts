import { FileListSanitizeStrategy } from './FileListSanitizeStrategy'


export class AllButNotGitKeepSanitizeStrategy implements FileListSanitizeStrategy {
  sanitize(files: Array<string>): Array<string> {
    return files.filter(name => name && !/\.gitkeep$/ig.test(name));
  }
}
