"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleIO = void 0;
const utils_1 = require("../utils");
const inquirer_1 = require("./inquirer");
const logger_1 = require("./logger");
class ConsoleIO {
    constructor(schemaString, argv) {
        this.schemaString = schemaString;
        this.argv = argv;
        this.values = { arguments: {}, options: {} };
        this.values = { arguments: {}, options: {} };
        this.rawValues = Object.assign({}, this.argv);
        this.missingArguments = [];
        this.hasErrors = false;
    }
    static from(schemaString, argv) {
        const parent = new ConsoleIO(schemaString, argv);
        parent.handle();
        return parent;
    }
    argument(key) {
        return this.values.arguments[key];
    }
    option(key) {
        return this.values.options[key];
    }
    handle() {
        this.schema = utils_1.ArgumentParser.from(this.schemaString);
        this.values = { arguments: {}, options: {} };
        this.rawValues = Object.assign({}, this.argv);
        const argumentValues = this.argv._.splice(1);
        for (const argument of this.schema.arguments) {
            if (argument.isArray && argumentValues.length > 0) {
                this.values.arguments[argument.name] = argumentValues;
                break;
            }
            else {
                const singleArgumentValue = argumentValues.splice(0, 1);
                if (singleArgumentValue.length > 0) {
                    this.values.arguments[argument.name] = singleArgumentValue[0];
                }
            }
            if (!this.values.arguments[argument.name]) {
                if (argument.defaultValue !== 'secret_default_value') {
                    this.values.arguments[argument.name] = argument.isArray
                        ? [argument.defaultValue]
                        : argument.defaultValue;
                }
            }
        }
        this.validateArguments();
        if (this.hasErrors)
            return this;
        for (const option of this.schema.options) {
            const value = this.argv[option.name];
            if (value) {
                this.values.options[option.name] = value;
            }
            else {
                this.values.options[option.name] = option.defaultValue;
            }
        }
        return this;
    }
    validateArguments() {
        for (const argument of this.schema.arguments) {
            if (!this.values.arguments[argument.name] && argument.isRequired) {
                this.missingArguments.push(argument.name);
            }
        }
        if (this.missingArguments.length > 0) {
            this.hasErrors = true;
        }
    }
    info(msg, color) {
        logger_1.Logger.info(msg, color);
    }
    error(msg) {
        logger_1.Logger.error(msg);
    }
    success(msg) {
        logger_1.Logger.success(msg);
    }
    line() {
        logger_1.Logger.line();
    }
    table(rows) {
        logger_1.Logger.table(rows);
    }
    async ask(question) {
        return inquirer_1.Inquirer.ask(question);
    }
    async select(question, choices, multiple = false) {
        return inquirer_1.Inquirer.select(question, choices, multiple);
    }
    async confirm(question) {
        return inquirer_1.Inquirer.confirm(question);
    }
    async password(question, mask = '') {
        return inquirer_1.Inquirer.password(question, mask);
    }
}
exports.ConsoleIO = ConsoleIO;
//# sourceMappingURL=consoleIO.js.map