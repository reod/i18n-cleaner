import * as sinon from 'sinon';
import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { FileListSanitizeStrategy } from './../../services/file-system/FileListSanitizeStrategy';
import { GoogleTranslationService } from './../../services/translation/GoogleTranslationService';
import { TranslateLocales } from './TranslateLocales'


describe('TranslateLocales use case', () => {
  let fsService;
  let tService;
  let tlUseCase;

  beforeEach(() => {
    fsService = sinon.createStubInstance(FileSystemService);
    tService = sinon.createStubInstance(GoogleTranslationService);
    tlUseCase = new TranslateLocales(fsService, tService);
  });
  
  it('should get created', () => { 
    expect(tlUseCase).toBeInstanceOf(TranslateLocales);
  });
});