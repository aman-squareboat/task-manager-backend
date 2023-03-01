"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRunner = void 0;
const pc = __importStar(require("picocolors"));
const consoleIO_1 = require("./consoleIO");
const logger_1 = require("./logger");
const yargsParser = require("yargs-parser");
const metadata_1 = require("./metadata");
class CommandRunner {
    static async run(cmd) {
        const argv = yargsParser(cmd);
        const command = metadata_1.CommandMeta.getCommand(argv._[0].toString());
        await CommandRunner.handle(command, argv);
    }
    static async handle(command, args) {
        if (args.options) {
            CommandRunner.printOptions(command);
            return;
        }
        const _cli = consoleIO_1.ConsoleIO.from(command.expression, args);
        if (_cli.hasErrors && _cli.missingArguments.length > 0) {
            _cli.error(` Missing Arguments: ${_cli.missingArguments.join(', ')} `);
            return;
        }
        await command.target(_cli);
        return;
    }
    static printOptions(command) {
        const options = command.options.args || {};
        const commandOptions = [];
        for (const key in options) {
            commandOptions.push({
                name: key,
                description: options[key].desc,
                required: options[key].req ? 'Y' : '',
            });
        }
        logger_1.Logger.info(pc.bgBlue(pc.white(pc.bold(' Options '))));
        if (commandOptions.length) {
            logger_1.Logger.table(commandOptions);
        }
        else {
            logger_1.Logger.info('No option found for specified command');
        }
    }
}
exports.CommandRunner = CommandRunner;
//# sourceMappingURL=runner.js.map