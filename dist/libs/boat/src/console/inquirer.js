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
exports.Inquirer = void 0;
const inquirer = __importStar(require("inquirer"));
class Inquirer {
    static async ask(question) {
        const answers = await inquirer.prompt([
            { name: 'question', message: question },
        ]);
        return answers.question;
    }
    static async confirm(message) {
        const answer = await inquirer.prompt([
            { name: 'confirm_once', message, type: 'confirm' },
        ]);
        return answer.confirm_once;
    }
    static async select(message, choices, multiple = false) {
        const type = multiple ? 'checkbox' : 'list';
        const name = 'command';
        const answers = await inquirer.prompt([{ type, name, message, choices }]);
        return answers.command;
    }
    static async password(message, mask = '') {
        const type = 'password', name = 'command';
        const answers = await inquirer.prompt([{ type, name, message, mask }]);
        return answers[name];
    }
}
exports.Inquirer = Inquirer;
//# sourceMappingURL=inquirer.js.map