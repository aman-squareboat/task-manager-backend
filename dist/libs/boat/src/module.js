"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoatModule = void 0;
const common_1 = require("@nestjs/common");
const index_1 = __importDefault(require("../../../config/index"));
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const validator_1 = require("./validator");
const events_1 = require("./events");
const queue_1 = require("./events/queue");
const queue_2 = require("./queue");
const utils_1 = require("./utils");
const console_1 = require("./console");
const cache_1 = require("./cache");
const database_1 = require("../../database/src");
const pg_1 = __importDefault(require("pg"));
pg_1.default.types.setTypeParser(20, (val) => parseInt(val));
let BoatModule = class BoatModule {
};
BoatModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            core_1.DiscoveryModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                load: index_1.default,
            }),
            database_1.ObjectionModule.registerAsync({
                isGlobal: true,
                imports: [config_1.ConfigModule],
                useFactory: (config) => config.get('db'),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            utils_1.AppConfig,
            validator_1.BaseValidator,
            cache_1.CacheService,
            cache_1.CacheMetadata,
            cache_1.CacheCommands,
            console_1.ConsoleExplorer,
            events_1.EventExplorer,
            queue_1.EventQueueWorker,
            validator_1.IsValueFromConfigConstraint,
            console_1.ListCommands,
            queue_2.QueueExplorer,
            queue_2.QueueService,
            queue_2.QueueMetadata,
            queue_2.QueueConsoleCommands,
        ],
        exports: [validator_1.BaseValidator],
    })
], BoatModule);
exports.BoatModule = BoatModule;
//# sourceMappingURL=module.js.map