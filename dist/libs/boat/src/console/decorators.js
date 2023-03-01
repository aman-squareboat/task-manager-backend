"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Command(command, options) {
    options = options || {};
    return function (...args) {
        switch (args.length) {
            case 1:
                Reflect.defineMetadata(constants_1.BoatConstants.commandName, command, args[0]);
                Reflect.defineMetadata(constants_1.BoatConstants.commandOptions, options, args[0]);
                break;
            case 3:
                Reflect.defineMetadata(constants_1.BoatConstants.commandName, command, args[0], args[1]);
                Reflect.defineMetadata(constants_1.BoatConstants.commandOptions, options, args[0], args[1]);
                break;
        }
    };
}
exports.Command = Command;
//# sourceMappingURL=decorators.js.map