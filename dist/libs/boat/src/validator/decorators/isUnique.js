"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = exports.IsUniqueConstraint = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const database_1 = require("../../../../database/src");
let IsUniqueConstraint = class IsUniqueConstraint {
    async validate(value, args) {
        if ((0, lodash_1.isEmpty)(value))
            return false;
        const [{ table, column, caseInsensitive, where }] = args.constraints;
        if (caseInsensitive) {
            value = Array.isArray(value)
                ? value.map((v) => v.toLowerCase())
                : value.toLowerCase();
        }
        const connection = await database_1.ObjectionService.connection();
        const query = connection(table);
        Array.isArray(value)
            ? query.whereIn(column, value)
            : query.where(column, value);
        if (where)
            query.where(where);
        const result = await query.count({ count: '*' });
        const record = result[0] || {};
        const count = +record['count'];
        return Array.isArray(value) ? !!!(value.length === count) : !!!count;
    }
    defaultMessage(args) {
        const [options] = args.constraints;
        return `${options.column} already exists.`;
    }
};
IsUniqueConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsUniqueConstraint);
exports.IsUniqueConstraint = IsUniqueConstraint;
function IsUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        });
    };
}
exports.IsUnique = IsUnique;
//# sourceMappingURL=isUnique.js.map