"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Csv2Json = void 0;
const lodash_1 = require("lodash");
class Csv2Json {
    constructor(data) {
        this.data = data;
        this.isEmptyRow = (obj) => {
            let values = Object.values(obj);
            values.pop();
            return values.every((value) => {
                if (!value) {
                    return true;
                }
                return false;
            });
        };
    }
    handle() {
        const parsedResult = [];
        const len = this.data.length;
        let i = 0;
        let p = [];
        let a = [];
        let j = [];
        let isNested = false;
        while (i < len) {
            const ch = this.data.charAt(i);
            if (len - i == 1) {
                p.push(ch);
                a.push(p.join(''));
                j.push(a);
                a = [];
                p = [];
            }
            else if (!isNested && ch === ',') {
                a.push(p.join(''));
                p = [];
            }
            else if (ch === '\n' && !isNested) {
                a.push(p.join(''));
                j.push(a);
                a = [];
                p = [];
            }
            else if (ch === '"') {
                isNested = !isNested;
            }
            else {
                p.push(ch);
            }
            i++;
        }
        if (!j.length)
            return [];
        const headers = j[0];
        const rows = j.slice(1);
        for (let i in headers)
            headers[i] = (0, lodash_1.camelCase)(headers[i]);
        for (const row of rows) {
            let obj = {};
            for (const i in row)
                obj[headers[i]] = ['\r', ',', '', ''].includes(row[i]) ? null : row[i];
            if (!this.isEmptyRow(obj))
                parsedResult.push(obj);
            obj = {};
        }
        return parsedResult;
    }
}
exports.Csv2Json = Csv2Json;
//# sourceMappingURL=csvToJson.js.map