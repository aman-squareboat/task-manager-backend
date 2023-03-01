"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNotFound = void 0;
const common_1 = require("@nestjs/common");
class ModelNotFound extends common_1.HttpException {
    constructor(modelName) {
        super(`${modelName} not found`, 404);
    }
}
exports.ModelNotFound = ModelNotFound;
//# sourceMappingURL=modelNotFound.js.map