"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionNotFound = void 0;
class ConnectionNotFound extends Error {
    constructor(conName) {
        super(`${conName} not found! Please make sure you are passing correct connection name!`);
    }
}
exports.ConnectionNotFound = ConnectionNotFound;
//# sourceMappingURL=connectionNotFound.js.map