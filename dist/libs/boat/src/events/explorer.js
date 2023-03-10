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
exports.EventExplorer = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../constants");
const metadata_1 = require("./metadata");
let EventExplorer = class EventExplorer {
    constructor(discovery, metadataScanner) {
        this.discovery = discovery;
        this.metadataScanner = metadataScanner;
    }
    onModuleInit() {
        const wrappers = this.discovery.getProviders();
        wrappers.forEach((w) => {
            const { instance } = w;
            if (!instance ||
                typeof instance === 'string' ||
                !Object.getPrototypeOf(instance)) {
                return;
            }
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => this.lookupListeners(instance, key));
        });
    }
    lookupListeners(instance, key) {
        const methodRef = instance[key];
        const hasEventMeta = Reflect.hasMetadata(constants_1.BoatConstants.eventName, instance, key);
        if (!hasEventMeta)
            return;
        const eventName = Reflect.getMetadata(constants_1.BoatConstants.eventName, instance, key);
        metadata_1.EventMetadata.addListener(eventName, methodRef.bind(instance));
    }
};
EventExplorer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner])
], EventExplorer);
exports.EventExplorer = EventExplorer;
//# sourceMappingURL=explorer.js.map