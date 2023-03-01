"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailmanModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailmanModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const constants_1 = require("./constants");
let MailmanModule = MailmanModule_1 = class MailmanModule {
    static register(options) {
        return {
            global: true,
            module: MailmanModule_1,
            providers: [
                service_1.MailmanService,
                {
                    provide: constants_1.MAILABLE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            global: true,
            module: MailmanModule_1,
            providers: [service_1.MailmanService, this.createStorageOptionsProvider(options)],
        };
    }
    static createStorageOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.MAILABLE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: constants_1.MAILABLE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createMailmanOptions(),
            inject,
        };
    }
};
MailmanModule = MailmanModule_1 = __decorate([
    (0, common_1.Module)({})
], MailmanModule);
exports.MailmanModule = MailmanModule;
//# sourceMappingURL=module.js.map