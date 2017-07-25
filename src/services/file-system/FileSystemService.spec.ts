import { readFile, writeFile, unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { FileSystemService } from './FileSystemService';
import { AllButNotGitKeepSanitizeStrategy } from './AllButNotGitKeepSanitizeStrategy';
import {
  getPlaygroundPath,
  getPlaygroundFiles,
  getPlaygroundFilesPaths,
  createSamplePath,
  createPlayground,
  clearPlayground
} from './../../../test/test-utils';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

describe('FileSystemService', () => {
  let fsService = null;

  beforeAll(async () => {
    fsService = new FileSystemService(new AllButNotGitKeepSanitizeStrategy());
    await createPlayground();
  });

  afterAll(async () => {
    await clearPlayground();
  });

  it(`should return files from specified directory with full paths`, async () => {
    const files = getPlaygroundFilesPaths();
    const filesWithPath = await fsService.getFiles(getPlaygroundPath());

    expect(files).toEqual(filesWithPath);
  });

  it('should extract file name from given path', () => {
    const name = fsService.getFileName(createSamplePath());
    expect(name).toEqual('legia.win');
  });

  it(`should get list of files from specified direcotry`, async () => {
    const files = getPlaygroundFilesPaths().map(
      fsService.getFileName.bind(fsService)
    );
    const names = await fsService.getFileNames(getPlaygroundPath());

    expect(names).toEqual(files);
  });

  it('should get content of json like file as PJSO', async () => {
    const mockObj = {
      myTestJson: true,
      nestedObject: {
        int: 1,
        string: 'some string'
      }
    };

    const mock = await fsService.getFileContentAsObj(
      join(__dirname, '__mocks__', 'json-like-mock.js')
    );

    expect(mock).toBeInstanceOf(Object);
    expect(mock).toEqual(mockObj);
  });

  it('should return path of backup', () => {
    const path = createSamplePath();
    const backupPath = fsService.getBackupPath(path);

    expect(backupPath).toEqual(
      'arka/gdynia/kura/wiśnia/legia.win_i18n-manager_backup_file'
    );
  });
});
