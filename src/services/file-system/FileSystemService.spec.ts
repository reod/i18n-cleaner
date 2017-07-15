import { FileSystemService } from './FileSystemService';
import { join } from 'path';

const createSamplePath = (): string => {
  return join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win');
};

const getFilesInThisDir = (): Array<string> => {
  return ['FileSystemService.spec.ts', 'FileSystemService.ts', 'json-like-mock.js'];
};

describe('FileSystemService', () => {
  it(`should return files from specified directory with full paths`, async () => {
    const path = './src/services/file-system';
    const fsService = new FileSystemService();
    const files = getFilesInThisDir()
      .map(file => join(path, file));

    const filesWithPath = await fsService.getFiles(path);

    expect(files).toEqual(filesWithPath);
  });

  it('should extract file name from given path', () => {
    const fsService = new FileSystemService();
    const name = fsService.getFileName(createSamplePath());

    expect(name).toEqual('legia.win');
  });

  it(`should get list of files from specified direcotry`, async () => {
    const fsService = new FileSystemService();
    
    const files = getFilesInThisDir();;
    const names = await fsService.getFileNames('./src/services/file-system');

    expect(files).toEqual(names);
  });

  it('should get content of json like file as PJSO', async () => {
    const fsService = new FileSystemService();
    const mockObj = {
      "myTestJson": true,
      "nestedObject": {
        "int": 1,
        "string": "some string" 
      }
    };

    const mock = await fsService.getFileContentAsObj(join(__dirname, 'json-like-mock.js'));

    expect(mock).toBeInstanceOf(Object);
    expect(mock).toEqual(mockObj);
  });

  it('should return path of backup', () => {
    const fsService = new FileSystemService();
    const path = createSamplePath();
    const backupPath = fsService.getBackupPath(path);

    expect(backupPath).toEqual('arka/gdynia/kura/wiśnia/legia.win_i18n-cleaner_backup_file');
  });
});
