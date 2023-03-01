"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMeta = void 0;
const utils_1 = require("../utils");
class CommandMeta {
    static setCommand(command, target, options) {
        const parsedArgument = utils_1.ArgumentParser.from(command);
        const { name } = parsedArgument;
        CommandMeta.commands[name] = Object.assign(Object.assign({ target, expression: command }, parsedArgument), options);
        return;
    }
    static getAllCommands() {
        return CommandMeta.commands;
    }
    static getCommand(command) {
        if (!command)
            return null;
        const obj = CommandMeta.commands[command];
        return obj || null;
    }
    static getTarget(command) {
        const obj = CommandMeta.commands[command];
        return obj ? obj.target : null;
    }
}
exports.CommandMeta = CommandMeta;
CommandMeta.commands = {};
//# sourceMappingURL=metadata.js.map