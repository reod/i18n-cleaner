"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(baseLocalePath, sourceLng, targetLng, overrideExisting, outputFileName, save) {
        this.baseLocalePath = baseLocalePath;
        this.sourceLng = sourceLng;
        this.targetLng = targetLng;
        this.overrideExisting = overrideExisting;
        this.outputFileName = outputFileName;
        this.save = save;
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map