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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ObjectionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectionService = void 0;
const common_1 = require("@nestjs/common");
const baseModel_1 = require("./baseModel");
const constants_1 = require("./constants");
const knex_1 = __importDefault(require("knex"));
const exceptions_1 = require("./exceptions");
let ObjectionService = ObjectionService_1 = class ObjectionService {
    constructor(config) {
        const defaultConnection = config.connections[config.default];
        ObjectionService_1.config = config;
        ObjectionService_1.dbConnections = {};
        baseModel_1.BaseModel.knex((0, knex_1.default)(defaultConnection));
        for (const conName in config.connections) {
            ObjectionService_1.dbConnections[conName] = (0, knex_1.default)(config.connections[conName]);
        }
    }
    static connection(conName) {
        conName = conName || ObjectionService_1.config.default;
        const isConNameValid = Object.keys(ObjectionService_1.config.connections).includes(conName);
        if (conName && !isConNameValid) {
            throw new exceptions_1.ConnectionNotFound(conName);
        }
        return ObjectionService_1.dbConnections[conName ? conName : ObjectionService_1.config.default];
    }
};
ObjectionService = ObjectionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.SquareboatNestObjection.databaseOptions)),
    __metadata("design:paramtypes", [Object])
], ObjectionService);
exports.ObjectionService = ObjectionService;
//# sourceMappingURL=service.js.map