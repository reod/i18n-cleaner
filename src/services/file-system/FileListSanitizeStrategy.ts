export interface FileListSanitizeStrategy {
  sanitize(files:  Array<string>): Array<string>;
}
