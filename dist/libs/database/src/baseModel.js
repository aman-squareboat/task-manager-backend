"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const objection_1 = require("objection");
const helpers_1 = require("./helpers");
const queryBuilder_1 = require("./queryBuilder");
class BaseModel extends objection_1.Model {
    async $forceLoad(expression, options) {
        await this.$fetchGraph(expression, options);
    }
    async $load(expression, options) {
        const getKeys = (obj) => {
            const p = [];
            for (const key in obj) {
                const o = { parent: key, children: [] };
                if (key === "$recursive" || key === "$relation" || key === "$modify") {
                    continue;
                }
                const exp = obj[key];
                if (typeof exp === "object") {
                    o.children = getKeys(exp);
                }
                p.push(o);
            }
            return p;
        };
        const p = getKeys(expression);
        const toBeLoadedRelations = {};
        const getUnloadedRelationsList = async (model, rel, parent) => {
            for (const o of rel) {
                if (!model || !model[o.parent]) {
                    toBeLoadedRelations[parent !== "" ? `${parent}.${o.parent}` : o.parent] = true;
                }
                if (o.children.length > 0) {
                    getUnloadedRelationsList(model[o.parent], o.children, o.parent);
                }
            }
        };
        await getUnloadedRelationsList(this, p, "");
        const promises = [];
        const alreadyLoading = [];
        for (const key in toBeLoadedRelations) {
            const [parent] = key.split(".");
            if (!alreadyLoading.includes(parent)) {
                promises.push(this.$fetchGraph((0, helpers_1.pick)(expression, parent), options));
                alreadyLoading.push(parent);
            }
        }
        await Promise.all(promises);
        return;
    }
}
exports.BaseModel = BaseModel;
BaseModel.QueryBuilder = queryBuilder_1.CustomQueryBuilder;
BaseModel.useLimitInFirst = true;
//# sourceMappingURL=baseModel.js.map