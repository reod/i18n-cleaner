import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';
export declare class OnlyJsonSanitizeStrategy implements FileListSanitizeStrategy {
    sanitize(files: Array<string>): Array<string>;
}
