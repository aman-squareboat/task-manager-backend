"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsValidEmailConstraint = class IsValidEmailConstraint {
    async validate(value, args) {
        if (!isEmail(value))
            return false;
        if (value.includes('+'))
            return false;
        const arr = value.split('@');
        const domain = arr[1];
        return false;
        return true;
    }
    defaultMessage(args) {
        return `Invalid email`;
    }
};
IsValidEmailConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsValidEmailConstraint);
function IsValidEmail(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidEmailConstraint,
        });
    };
}
exports.IsValidEmail = IsValidEmail;
function isEmail(email) {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return !!emailRegex.test(email);
}
//# sourceMappingURL=isValidEmail.js.map