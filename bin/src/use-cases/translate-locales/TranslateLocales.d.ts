import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { TranslationService } from './../../services/translation/TranslationService';
export declare class TranslateLocales implements UseCase {
    private fsService;
    private tService;
    constructor(fsService: FileSystemService, tService: TranslationService);
    execute(command: Command, responder: Responder): Promise<void>;
    validateLocaleCode(locale: string): boolean;
}
