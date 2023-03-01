"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitEvent = exports.isEmpty = exports.isArray = exports.isObject = void 0;
function isObject(value) {
    if (typeof value === 'object' && value !== null) {
        return true;
    }
    return false;
}
exports.isObject = isObject;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isEmpty(value) {
    if (Array.isArray(value) && value.length < 1)
        return true;
    if (isObject(value) && Object.keys(value).length < 1)
        return true;
    if (!value)
        return true;
    return false;
}
exports.isEmpty = isEmpty;
async function EmitEvent(event) {
    await event.emit();
    return;
}
exports.EmitEvent = EmitEvent;
//# sourceMappingURL=helpers.js.map