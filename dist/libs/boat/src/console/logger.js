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
exports.Logger = void 0;
const pc = __importStar(require("picocolors"));
const Table = require("cli-table3");
class Logger {
    static info(msg, color) {
        color = color || 'cyan';
        this.print(msg, color);
    }
    static error(msg) {
        console.log(pc.bgRed(pc.bold(msg)));
    }
    static line() {
        console.log(pc.gray('-'.repeat(process.stdout.columns / 2)));
    }
    static success(msg) {
        this.print(msg, 'green');
    }
    static table(rows) {
        let columns = [];
        for (const row of rows) {
            columns = columns.concat(Object.keys(row));
        }
        columns = [...new Set(columns)];
        const uniqueCols = [];
        for (const col of columns) {
            uniqueCols.push(pc.cyan(pc.bold(col.charAt(0).toUpperCase() + col.slice(1))));
        }
        const pRows = [];
        rows.forEach((r) => pRows.push(Object.values(r).map((e) => (e && e.toString && e.toString()) || '')));
        const p = new Table({ head: uniqueCols });
        p.push(...pRows);
        console.log(p.toString());
    }
    static print(msg, color) {
        console.log(pc[color](msg));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map