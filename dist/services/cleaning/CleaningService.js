"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class CleaningService {
    static fillMissingFields(refObj, objects) {
        return objects.map(this.fillMissingFieldsInObj.bind(this, refObj));
    }
    static fillMissingFieldsInObj(refObj, objectToFill) {
        const filled = Object.assign({}, objectToFill);
        Object.keys(refObj)
            .forEach(key => {
            if (!lodash_1.isPlainObject(refObj[key])) {
                filled[key] = filled[key] || refObj[key];
                return;
            }
            filled[key] = this.fillMissingFieldsInObj(refObj[key], filled[key]);
        });
        return filled;
    }
    static sortFields(refObj, objects) {
        return objects.map(this.sortFieldsInObj.bind(this, refObj));
    }
    static sortFieldsInObj(refObj, object) {
        const sorted = {};
        Object.keys(refObj)
            .forEach(key => {
            sorted[key] = object[key];
        });
        return sorted;
    }
}
exports.CleaningService = CleaningService;
//# sourceMappingURL=CleaningService.js.map