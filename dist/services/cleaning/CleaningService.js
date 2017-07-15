"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CleaningService {
    static fillMissingFields(referenceObj, objects) {
        return objects.map(this.fillMissingFieldsInObj.bind(this, referenceObj));
    }
    static fillMissingFieldsInObj(referenceObj, objectToFill) {
        const filled = Object.assign({}, objectToFill);
        Object.keys(referenceObj)
            .forEach(key => {
            if (!objectToFill.hasOwnProperty(key)) {
                filled[key] = referenceObj[key];
            }
        });
        return filled;
    }
    static sortFields(referenceObj, objects) {
        return objects.map(this.sortFieldsInObj.bind(this, referenceObj));
    }
    static sortFieldsInObj(referenceObj, object) {
        const sorted = {};
        Object.keys(referenceObj)
            .forEach(key => {
            sorted[key] = object[key];
        });
        return sorted;
    }
}
exports.CleaningService = CleaningService;
//# sourceMappingURL=CleaningService.js.map