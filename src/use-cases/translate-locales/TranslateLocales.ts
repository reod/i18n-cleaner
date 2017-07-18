import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { TranslationService } from './../../services/translation/TranslationService';


export class TranslateLocales implements UseCase {

  constructor(
    private fsService: FileSystemService,
    private tService: TranslationService) {}

  async execute(command: Command, responder: Responder): Promise<void> {
    let baseLocale: any = null;

    if (command.sourceLng === command.targetLng) {
      responder.cannotTranslateLocales(new Error('Source and target language is the same!'));
      return;
    }

    if (!this.validateLocaleCode(command.sourceLng) || 
      !this.validateLocaleCode(command.targetLng)) {
      responder.cannotTranslateLocales(
        new Error(`Invalid locale code - use two letters, eg. 'en' or 'es'.`)
      );
      return;
    }

    try {
      baseLocale = await this.fsService.getFileContentAsObj(command.baseLocalePath);
    } catch(e) {
      responder.cannotTranslateLocales(e);
      return;
    }

    let translated = null;
    try {
      translated = await this.tService.translate(
        command.sourceLng, command.targetLng, baseLocale, command.overrideExisting
      );
    } catch(e) {
      responder.cannotTranslateLocales(e);
      return;
    }

    responder.localesTranslated(baseLocale, translated);
  }

  validateLocaleCode(locale: string) {
    if (locale.length === 0) return false;
    if (locale.length > 4) return false;
    return true;
  }
}
