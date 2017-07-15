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
        const refLocalePath = files.find(isRefFile);
        if (!refLocalePath) {
            responder.cannotCleanLocales(new Error('Reference file invalid.'));
            return;
        }
        const localesToCleanPaths = files.filter(file => !isRefFile(file));
        if (localesToCleanPaths.length === 0) {
            responder.cannotCleanLocales(new Error('No locales to clean.'));
        }
        const refLocale = await this.fsService.getFileContentAsObj(refLocalePath);
        const getContentAsObj = this.fsService.getFileContentAsObj.bind(this.fsService);
        let localesToClean = await Promise.all(localesToCleanPaths.map(getContentAsObj));
        if (command.fillMissing) {
            localesToClean = await this.getFilledLocales(refLocale, localesToClean);
        }
        if (command.sort) {
            localesToClean = await this.getSortedLocales(refLocale, localesToClean);
        }
        if (command.save) {
            for (let i = 0, l = localesToCleanPaths.length; i < l; i++) {
                const path = localesToCleanPaths[i];
                const content = localesToClean[i];
                await this.fsService.saveContentToFile(path, content);
            }
        }
        responder.localesCleaned(refLocale, localesToClean);
    }
    async getFilledLocales(refLocale, localesToClean) {
        return this.cService.fillMissingFields(refLocale, localesToClean);
    }
    async getSortedLocales(refLocale, localesToClean) {
        return this.cService.sortFields(refLocale, localesToClean);
    }
}
exports.CleanLocales = CleanLocales;
//# sourceMappingURL=CleanLocales.js.map