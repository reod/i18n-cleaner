import { FileListSanitizeStrategy } from './FileListSanitizeStrategy';
export declare class FileSystemService {
    private sStrategy;
    private backupSufix;
    constructor(sStrategy: FileListSanitizeStrategy);
    getFiles(path: string): Promise<string[]>;
    getFileName(path: string): string;
    getFileNames(path: string): Promise<string[]>;
    getFileContentAsObj(path: string): Promise<object>;
    saveContentToFile(path: string, content: any, doBackup?: boolean): Promise<void>;
    getBackupPath(path: string): string;
}
