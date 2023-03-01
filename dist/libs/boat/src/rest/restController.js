"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestController = void 0;
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const validator_1 = require("../validator");
class RestController {
    async transform(obj, transformer, options) {
        transformer = this.setTransformerContext(transformer, options);
        return await transformer
            .parseIncludes(this.getIncludes(options === null || options === void 0 ? void 0 : options.req))
            .work(obj);
    }
    async collection(collect, transformer, options) {
        transformer = this.setTransformerContext(transformer, options);
        const collection = [];
        for (const o of collect) {
            collection.push(await transformer.parseIncludes(this.getIncludes(options === null || options === void 0 ? void 0 : options.req)).work(o));
        }
        return collection;
    }
    async paginate(obj, transformer, options) {
        const collection = this.collection(obj.data, transformer, options);
        return Object.assign({ data: await collection, pagination: obj.pagination }, (0, lodash_1.omit)(obj, ['data', 'pagination']));
    }
    setTransformerContext(transformer, options) {
        transformer.ctx.setRequest((options === null || options === void 0 ? void 0 : options.req) || {});
        return transformer;
    }
    getIncludes(req) {
        if (!req)
            return '';
        return (0, lodash_1.get)(req.all(), 'include', '');
    }
    validator(req) {
        const validator = new validator_1.BaseValidator();
        req && validator.setContext(req);
        return validator;
    }
    buildDto(schemaPayload, schemaMeta) {
        return (0, class_transformer_1.plainToClass)(schemaMeta, schemaPayload);
    }
}
exports.RestController = RestController;
//# sourceMappingURL=restController.js.map