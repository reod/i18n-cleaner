import { writeFile, unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);


export function getPlaygroundPath(): string {
  return join('./test', 'playground');
};

export function getPlaygroundFiles(): Array<any> {
  return [
    {
      name: 'en.json',
      content: {
        "language": "English",
        "capitol": "London",
        "units": {
          "time_hour": "hour",
          "currency": "GBP",
          "drink": "tea"
        }
      }
    },
    {
      name: 'pl.json',
      content: {
        "language": "Polski",
        "capitol": "Warszawa",
        "units": {
          "time_hour": "godzina",
          "currency": "PLN"
        }
      }
    }
  ];
};

export function getPlaygroundFilesPaths(): Array<string> {
  return getPlaygroundFiles().map(file => join(getPlaygroundPath(), file.name));
};

export function createSamplePath(): string {
  return join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win');
};

export async function createPlayground(): Promise<void> {
  await Promise.all(
    getPlaygroundFiles()
      .map(file => {
        const path = join(getPlaygroundPath(), file.name);
        const content = JSON.stringify(file.content, null, 2);

        return writeFileAsync(path, content);
      })
  );
};

export async function clearPlayground(): Promise<void> {
  for (const { name } of getPlaygroundFiles()) {
    const path = join(getPlaygroundPath(), name);
    const backup = `${path}_i18n-manager_backup_file`;

    try {
      await unlinkAsync(path);
      await unlinkAsync(backup);
    } catch (e) {}
  }
};
