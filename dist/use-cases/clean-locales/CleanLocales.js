"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CleanLocales {
    constructor(fsService, cService) {
        this.fsService = fsService;
        this.cService = cService;
    }
    async execute(command, responder) {
        const files = await this.fsService.getFiles(command.directory);
        const isRefFile = (file) => this.fsService.getFileName(file) === command.referenceFileName;
        const refFilePath = files.find(isRefFile);
        if (!refFilePath) {
            responder.cannotCleanLocales(new Error('Reference file invalid.'));
            return;
        }
        const filesToCleanPaths = files.filter(file => !isRefFile(file));
        if (filesToCleanPaths.length === 0) {
            responder.cannotCleanLocales(new Error('No locales to clean.'));
        }
        const refLocale = await this.fsService.getFileContentAsObj(refFilePath);
        const localesToClean = await Promise.all(filesToCleanPaths.map(this.fsService.getFileContentAsObj.bind(this.fsService)));
        const localesWithSortedFields = this.cService.sortFields(refLocale, localesToClean);
        responder.localesCleaned(refLocale, localesWithSortedFields);
    }
}
exports.CleanLocales = CleanLocales;
//# sourceMappingURL=CleanLocales.js.map