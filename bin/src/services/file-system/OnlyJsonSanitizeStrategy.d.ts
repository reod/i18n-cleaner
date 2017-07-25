import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';
export declare class OnlyJsonSanitizeStrategy implements FileListSanitizeStrategy {
    sanitize(files: string[]): string[];
}
