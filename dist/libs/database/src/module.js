"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ObjectionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectionModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const service_1 = require("./service");
const migrations_1 = require("./commands/migrations");
let ObjectionModule = ObjectionModule_1 = class ObjectionModule {
    static register(options) {
        return {
            global: options.isGlobal || false,
            module: ObjectionModule_1,
            imports: [core_1.DiscoveryModule],
            providers: [
                service_1.ObjectionService,
                migrations_1.DbOperationsCommand,
                { provide: constants_1.SquareboatNestObjection.databaseOptions, useValue: options },
            ],
            exports: [],
        };
    }
    static registerAsync(options) {
        return {
            global: options.isGlobal || false,
            module: ObjectionModule_1,
            imports: [core_1.DiscoveryModule],
            providers: [
                this.createOptionsProvider(options),
                service_1.ObjectionService,
                migrations_1.DbOperationsCommand,
            ],
            exports: [],
        };
    }
    static createOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.SquareboatNestObjection.databaseOptions,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: constants_1.SquareboatNestObjection.databaseOptions,
            useFactory: async (optionsFactory) => await optionsFactory.createOptions(),
            inject,
        };
    }
};
ObjectionModule = ObjectionModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [],
    })
], ObjectionModule);
exports.ObjectionModule = ObjectionModule;
//# sourceMappingURL=module.js.map