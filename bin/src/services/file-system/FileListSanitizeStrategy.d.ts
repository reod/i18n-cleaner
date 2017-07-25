export interface FileListSanitizeStrategy {
    sanitize(files: string[]): string[];
}
