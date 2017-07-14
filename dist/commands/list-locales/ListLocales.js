"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListLocales {
    constructor(fsService) {
        this.fsService = fsService;
        this.execute = async (path) => {
            const files = await this.fsService.getFileNames(path);
            files.forEach(file => {
                console.log(file);
            });
        };
    }
}
exports.ListLocales = ListLocales;
//# sourceMappingURL=ListLocales.js.map