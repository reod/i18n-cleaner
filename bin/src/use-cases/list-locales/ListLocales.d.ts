import { Command } from './Command';
import { Responder } from './Responder';
import { UseCase } from './../UseCase';
import { FileSystemService } from './../../services/file-system/FileSystemService';
export declare class ListLocales implements UseCase {
    private fsService;
    constructor(fsService: FileSystemService);
    execute(command: Command, responder: Responder): Promise<void>;
}
