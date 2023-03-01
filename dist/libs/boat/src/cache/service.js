"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("./drivers/redis");
const metadata_1 = require("./metadata");
let CacheService = CacheService_1 = class CacheService {
    onModuleInit() {
        const { stores } = metadata_1.CacheMetadata.getData();
        CacheService_1.stores = {};
        for (const store in stores) {
            CacheService_1.stores[store] = new redis_1.RedisDriver(stores[store]);
        }
    }
};
CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)()
], CacheService);
exports.CacheService = CacheService;
//# sourceMappingURL=service.js.map