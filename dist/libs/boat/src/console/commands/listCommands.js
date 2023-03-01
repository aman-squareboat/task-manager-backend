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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCommands = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators");
const metadata_1 = require("../metadata");
const pc = __importStar(require("picocolors"));
let ListCommands = class ListCommands {
    async handle(_cli) {
        const commands = metadata_1.CommandMeta.getAllCommands();
        const keys = Object.keys(commands).sort().reverse();
        const commandGroups = { '#': [] };
        for (const key of keys) {
            const c = key.split(':');
            if (c.length === 1) {
                if (commandGroups[c[0]]) {
                    commandGroups[c[0]].push(key);
                }
                else {
                    commandGroups['#'].push(c[0]);
                }
            }
            else {
                if (commandGroups[c[0]]) {
                    commandGroups[c[0]].push(key);
                }
                else {
                    commandGroups[c[0]] = [key];
                }
            }
        }
        for (const group in commandGroups) {
            _cli.success(pc.bgBlue(pc.white(pc.bold(' ' + group + ' '))));
            const list = [];
            const sortedCommands = commandGroups[group].sort();
            for (const command of sortedCommands) {
                const options = commands[command].options || {};
                list.push({
                    command: pc.green(pc.bold(command)),
                    description: options.desc || 'Command Description',
                });
            }
            _cli.table(list);
        }
    }
};
ListCommands = __decorate([
    (0, common_1.Injectable)(),
    (0, decorators_1.Command)('list', { desc: 'Command to list all the commands' })
], ListCommands);
exports.ListCommands = ListCommands;
//# sourceMappingURL=listCommands.js.map