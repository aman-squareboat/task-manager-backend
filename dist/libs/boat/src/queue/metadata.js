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
var QueueMetadata_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueMetadata = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let QueueMetadata = QueueMetadata_1 = class QueueMetadata {
    constructor(config) {
        this.config = config;
        QueueMetadata_1.data = this.config.get('queue');
        const data = QueueMetadata_1.data;
        QueueMetadata_1.defaultOptions = {
            connection: data.default,
            queue: data.connections[data.default].queue,
            delay: 10,
            tries: 5,
            timeout: 30,
            sleep: 5000,
        };
    }
    static getDefaultOptions() {
        return QueueMetadata_1.defaultOptions;
    }
    static getData() {
        return QueueMetadata_1.data;
    }
    static addJob(jobName, target) {
        QueueMetadata_1.store.jobs[jobName] = target;
    }
    static getJob(jobName) {
        return QueueMetadata_1.store.jobs[jobName];
    }
};
QueueMetadata.store = { jobs: {} };
QueueMetadata = QueueMetadata_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], QueueMetadata);
exports.QueueMetadata = QueueMetadata;
//# sourceMappingURL=metadata.js.map