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
exports.QueueExplorer = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../constants");
const metadata_1 = require("./metadata");
let QueueExplorer = class QueueExplorer {
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
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => this.lookupJobs(instance, key));
        });
    }
    lookupJobs(instance, key) {
        const methodRef = instance[key];
        const hasJobMeta = Reflect.hasMetadata(constants_1.BoatConstants.queueJobName, instance, key);
        if (!hasJobMeta)
            return;
        const jobName = Reflect.getMetadata(constants_1.BoatConstants.queueJobName, instance, key);
        metadata_1.QueueMetadata.addJob(jobName, {
            options: Reflect.getMetadata(constants_1.BoatConstants.queueOptions, instance, key),
            target: methodRef.bind(instance),
        });
    }
};
QueueExplorer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner])
], QueueExplorer);
exports.QueueExplorer = QueueExplorer;
//# sourceMappingURL=explorer.js.map