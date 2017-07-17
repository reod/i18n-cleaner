"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OnlyJsonSanitizeStrategy {
    sanitize(files) {
        return files.filter(name => /\w+.json$/ig.test(name));
    }
}
exports.OnlyJsonSanitizeStrategy = OnlyJsonSanitizeStrategy;
//# sourceMappingURL=OnlyJsonSanitizeStrategy.js.map