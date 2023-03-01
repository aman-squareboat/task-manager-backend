"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformer = void 0;
const context_1 = require("../utils/context");
const expParser_1 = require("../utils/expParser");
class Transformer {
    constructor() {
        this.availableIncludes = [];
        this.defaultIncludes = [];
        this.includes = {};
        this.ctx = new context_1.Context();
    }
    async item(obj, transformer, options) {
        if (!obj)
            return null;
        transformer = this.applyOptions(transformer, options);
        return transformer.work(obj);
    }
    async collection(arr, transformer, options) {
        if (!arr || arr.length === 0)
            return [];
        transformer = this.applyOptions(transformer, options);
        const result = [];
        for (let data of arr) {
            data = await transformer.work(data);
            result.push(data);
        }
        return result;
    }
    applyOptions(transformer, options) {
        options = options || { include: [] };
        if (options.include) {
            transformer.parseIncludes(options.include.join(','));
        }
        transformer.ctx.setRequest(this.ctx.getRequest());
        return transformer;
    }
    parseIncludes(include = '') {
        const defaultIncludes = (this.defaultIncludes || []).join(',');
        this.includes = expParser_1.ExpParser.from(defaultIncludes + ',' + include).toObj();
        return this;
    }
    async work(data) {
        let result = {};
        if (data instanceof Object) {
            result = await this.transform(data);
        }
        const handlerName = (name) => 'include' + name.charAt(0).toUpperCase() + name.slice(1);
        for (const include in this.includes) {
            const handler = handlerName(include);
            const nestedIncludes = this.includes[include];
            if (this[handler]) {
                result[include] = await this[handler](data, {
                    include: nestedIncludes || '',
                });
            }
        }
        return result;
    }
}
exports.Transformer = Transformer;
//# sourceMappingURL=transformer.js.map