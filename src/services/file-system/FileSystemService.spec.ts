import { FileSystemService } from './FileSystemService';
import { join } from 'path';

describe('FileSystemService', () => {
  it(`should return files from specified directory with full paths`, async () => {
    const path = './src/services/file-system';
    const fsService = new FileSystemService();
    const files = ['FileSystemService.spec.ts', 'FileSystemService.ts', 'json-like-mock.js']
      .map(file => join(path, file));

    const filesWithPath = await fsService.getFiles(path);

    expect(files).toEqual(filesWithPath);
  });

  it('should extract file name from given path', () => {
    const fsService = new FileSystemService();
    const name = fsService.getFileName(join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win'));

    expect(name).toEqual('legia.win');
  });

  it(`should get list of files from specified direcotry`, async () => {
    const fsService = new FileSystemService();
    
    const files = ['FileSystemService.spec.ts', 'FileSystemService.ts', 'json-like-mock.js'];
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
});
