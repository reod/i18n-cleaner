export declare class Command {
    baseLocalePath: string;
    sourceLng: string;
    targetLng: string;
    overrideExisting: boolean;
    outputFileName: string;
    save: boolean;
    constructor(baseLocalePath: string, sourceLng: string, targetLng: string, overrideExisting: boolean, outputFileName: string, save: boolean);
}
