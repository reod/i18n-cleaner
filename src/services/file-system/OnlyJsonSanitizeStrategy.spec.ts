import { OnlyJsonSanitizeStrategy } from './OnlyJsonSanitizeStrategy';

describe('OnlyJsonSanitizeStrategy', () => {
  it('should return only json files from given list of files', () => {
    const sStrategy = new OnlyJsonSanitizeStrategy();

    expect(sStrategy.sanitize([])).toEqual([]);
    expect(sStrategy.sanitize([null, undefined, ''])).toEqual([]);

    expect(
      sStrategy.sanitize(['en.json', 'pl.json', 'lol.bin', 'without'])
    ).toEqual(['en.json', 'pl.json']);
  });
});
