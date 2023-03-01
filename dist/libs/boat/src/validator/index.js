"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dto = exports.Validate = exports.BaseValidator = void 0;
const common_1 = require("@nestjs/common");
const basevalidator_1 = require("./basevalidator");
Object.defineProperty(exports, "BaseValidator", { enumerable: true, get: function () { return basevalidator_1.BaseValidator; } });
const customValidation_1 = require("./customValidation");
__exportStar(require("class-validator"), exports);
__exportStar(require("./decorators"), exports);
function Validate(Dto, options = {}) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('dtoSchema', Dto), (0, common_1.SetMetadata)('dtoOptions', options), (0, common_1.UseGuards)(customValidation_1.CustomValidationPipe));
}
exports.Validate = Validate;
exports.Dto = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request._dto;
});
//# sourceMappingURL=index.js.map