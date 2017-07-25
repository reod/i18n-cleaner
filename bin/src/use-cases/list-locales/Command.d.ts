import { UseCaseCommand } from './../UseCase';
export declare class Command implements UseCaseCommand {
    path: string;
    constructor(path: string);
}
