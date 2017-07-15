"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CleanLocales {
    constructor(fsService, cService) {
        this.fsService = fsService;
        this.cService = cService;
    }
    execute(command, responder) {
        console.log(command);
        responder.localesCleaned();
        responder.cannotGetLocales(new Error());
        responder.cannotSaveLocales(new Error());
    }
}
exports.CleanLocales = CleanLocales;
//# sourceMappingURL=CleanLocales.js.map