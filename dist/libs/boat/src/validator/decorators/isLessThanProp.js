"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLessThanProp = void 0;
const class_validator_1 = require("class-validator");
let IsLessThanConstraint = class IsLessThanConstraint {
    async validate(value, args) {
        let returnValue = true;
        for (let i = 0; i < args.constraints.length; i++) {
            if (value > args.object[args.constraints[i]]) {
                returnValue = false;
            }
        }
        return returnValue;
    }
    defaultMessage(args) {
        const property = args.property;
        return `${property} should be less than ${args.constraints.join(',')}`;
    }
};
IsLessThanConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsLessThanConstraint);
function IsLessThanProp(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: property,
            validator: IsLessThanConstraint,
        });
    };
}
exports.IsLessThanProp = IsLessThanProp;
//# sourceMappingURL=isLessThanProp.js.map