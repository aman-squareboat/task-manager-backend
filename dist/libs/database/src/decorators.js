"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectModel = void 0;
const baseModel_1 = require("./baseModel");
function InjectModel(model) {
    if (!(model.prototype instanceof baseModel_1.BaseModel)) {
        throw new Error(`Instance of ${baseModel_1.BaseModel.name} expected, ${typeof model} passed!`);
    }
    return function (target, key) {
        Object.assign(target, {
            [key]: model,
        });
    };
}
exports.InjectModel = InjectModel;
//# sourceMappingURL=decorators.js.map