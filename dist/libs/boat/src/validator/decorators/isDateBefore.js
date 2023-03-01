"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateBefore = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsDateBeforeConstraint = class IsDateBeforeConstraint {
    async validate(value, args) {
        const [date] = args.constraints;
        return new Date(value) < new Date(date);
    }
    defaultMessage(args) {
        const [date] = args.constraints;
        return `${args.property} should be less than ${date} `;
    }
};
IsDateBeforeConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsDateBeforeConstraint);
function IsDateBefore(date, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [date],
            validator: IsDateBeforeConstraint,
        });
    };
}
exports.IsDateBefore = IsDateBefore;
//# sourceMappingURL=isDateBefore.js.map