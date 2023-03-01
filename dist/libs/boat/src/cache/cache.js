"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStore = exports.Cache = exports.CacheKey = void 0;
const utils_1 = require("../utils");
const metadata_1 = require("./metadata");
const service_1 = require("./service");
class CacheKey {
    static fromObj(obj) {
        return utils_1.ExpParser.buildFromObj(obj);
    }
}
exports.CacheKey = CacheKey;
class Cache {
    static store(store) {
        const options = metadata_1.CacheMetadata.getData();
        return service_1.CacheService.stores[store || options.default];
    }
}
exports.Cache = Cache;
function CacheStore(store) {
    const options = metadata_1.CacheMetadata.getData();
    return service_1.CacheService.stores[store || options.default];
}
exports.CacheStore = CacheStore;
//# sourceMappingURL=cache.js.map