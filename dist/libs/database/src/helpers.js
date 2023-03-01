"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
function pick(obj, props) {
    const newObj = {};
    if (typeof props === "string" && obj.hasOwnProperty(props)) {
        newObj[props] = obj[props];
    }
    if (Array.isArray(props)) {
        for (const prop of props) {
            if (obj.hasOwnProperty(prop)) {
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}
exports.pick = pick;
//# sourceMappingURL=helpers.js.map