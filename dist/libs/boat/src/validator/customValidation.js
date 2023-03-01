"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const basevalidator_1 = require("./basevalidator");
let CustomValidationPipe = class CustomValidationPipe {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const schema = this.reflector.get('dtoSchema', context.getHandler());
        const options = Object.assign({}, this.reflector.get('dtoOptions', context.getHandler()));
        if (options.schemaGroup) {
            options['groups'] = [req.all()[options.schemaGroup]];
            delete options.schemaGroup;
        }
        const validator = new basevalidator_1.BaseValidator();
        validator.setContext(req);
        req._dto = await validator.fire(req.all(), schema, options);
        return true;
    }
};
CustomValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], CustomValidationPipe);
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=customValidation.js.map