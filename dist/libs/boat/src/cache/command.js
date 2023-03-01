"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheCommands = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("../console");
const cache_1 = require("./cache");
let CacheCommands = class CacheCommands {
    async listPrefixes(cli) {
        const store = cli.option('store') || '';
        const keys = await cache_1.Cache.store(store).keys(cli.option('prefix'));
        for (const key of keys) {
            cli.info(key);
        }
    }
    async flushCache(cli) {
        const store = cli.option('store') || '';
        const keys = await cache_1.Cache.store(store).keys(cli.option('prefix'));
        if (keys.length == 0) {
            cli.error(` No keys to delete `);
            return;
        }
        cli.error(` Deleting following keys `);
        for (const key of keys) {
            cli.info(key);
            await cache_1.Cache.store(store).ignorePrefix().forget(key);
        }
    }
};
__decorate([
    (0, console_1.Command)('cache:ls {--store=} {--prefix=*}', {
        desc: 'Command to list all the keys',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], CacheCommands.prototype, "listPrefixes", null);
__decorate([
    (0, console_1.Command)('cache:flush {--store=} {--prefix=*}', {
        desc: 'Command to flush all the keys',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], CacheCommands.prototype, "flushCache", null);
CacheCommands = __decorate([
    (0, common_1.Injectable)()
], CacheCommands);
exports.CacheCommands = CacheCommands;
//# sourceMappingURL=command.js.map