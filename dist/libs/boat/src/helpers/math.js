"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathHelpers = void 0;
class MathHelpers {
    static addPercent(num, percent) {
        return num * (1 + percent / 100);
    }
    static round(num) {
        return Math.round(num);
    }
    static asInt(num) {
        return parseInt(num) || 0;
    }
    static mul(...a) {
        let b = 1;
        for (const x of a) {
            b *= parseFloat(x);
        }
        return b;
    }
    static add(...a) {
        let b = 0;
        for (const x of a)
            b += x || 0;
        return b;
    }
    static ceil(a) {
        return Math.ceil(a);
    }
}
exports.MathHelpers = MathHelpers;
//# sourceMappingURL=math.js.map