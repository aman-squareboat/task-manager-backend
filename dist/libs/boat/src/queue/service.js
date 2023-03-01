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
var QueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const metadata_1 = require("./metadata");
const config_1 = require("@nestjs/config");
let QueueService = QueueService_1 = class QueueService {
    constructor(config) {
        this.config = config;
        this.options = config.get('queue');
        for (const connName in this.options.connections) {
            const connection = this.options.connections[connName];
            const driver = connection.driver;
            QueueService_1.connections[connName] = new driver(connection);
        }
    }
    static getConnection(connection) {
        const options = metadata_1.QueueMetadata.getData();
        if (!connection)
            connection = options.default;
        return QueueService_1.connections[connection];
    }
};
QueueService.connections = {};
QueueService = QueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], QueueService);
exports.QueueService = QueueService;
//# sourceMappingURL=service.js.map