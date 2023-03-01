"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
class ForbiddenException extends common_1.HttpException {
    constructor(errors) {
        super(errors.msg || 'forbidden exception occurred', common_1.HttpStatus.FORBIDDEN);
        this.errors = errors;
    }
    getErrors() {
        return this.errors;
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbiddenException.js.map