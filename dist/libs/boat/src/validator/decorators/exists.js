"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exists = exports.ExistsConstraint = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const database_1 = require("../../../../database/src");
let ExistsConstraint = class ExistsConstraint {
    async validate(value, args) {
        if (!value && (0, lodash_1.isEmpty)(value))
            return false;
        const [{ table, column, caseInsensitive, where, model, modelProp }] = args.constraints;
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
        const result = await query;
        if (Array.isArray(value) && result.length !== value.length) {
            return false;
        }
        else if (result.length == 0) {
            return false;
        }
        if (!model)
            return true;
        const records = result.map((s) => {
            const m = new model();
            return m.$setJson(s);
        });
        const propName = modelProp || args.property;
        if (model) {
            if (Array.isArray(value)) {
                console.log(args, records);
                args.object[propName] = records;
            }
            else {
                args.object[propName] = records[0];
            }
        }
        return true;
    }
    defaultMessage(args) {
        const [options] = args.constraints;
        return `${options.column} does not exist.`;
    }
};
ExistsConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], ExistsConstraint);
exports.ExistsConstraint = ExistsConstraint;
function Exists(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: ExistsConstraint,
        });
    };
}
exports.Exists = Exists;
//# sourceMappingURL=exists.js.map