import { UseCase } from './../UseCase';
import { Command } from './Command';
import { Responder } from './Responder';
import { FileSystemService } from './../../services/file-system/FileSystemService';
import { CleaningService } from './../../services/cleaning/CleaningService';
export declare class CleanLocales implements UseCase {
    private fsService;
    private cService;
    constructor(fsService: FileSystemService, cService: CleaningService);
    execute(command: Command, responder: Responder): Promise<void>;
    private getFilledLocales(refLocale, localesToClean);
    private getSortedLocales(refLocale, localesToClean);
    private saveLocales(paths, locales);
}
