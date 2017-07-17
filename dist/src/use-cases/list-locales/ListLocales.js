"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListLocales {
    constructor(fsService) {
        this.fsService = fsService;
    }
    async execute(command, responder) {
        let files;
        try {
            files = await this.fsService.getFileNames(command.path);
        }
        catch (e) {
            responder.cannotGetLocales(e);
        }
        responder.localesFound(files);
    }
}
exports.ListLocales = ListLocales;
//# sourceMappingURL=ListLocales.js.map