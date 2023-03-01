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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const boat_1 = require("../../../../../libs/boat/src");
const validator_1 = require("../../../../../libs/boat/src/validator");
const common_1 = require("../../../../../libs/common/src");
const common_2 = require("@nestjs/common");
const services_1 = require("../services");
const getTaskUpdateHistoryById_1 = require("../validators/getTaskUpdateHistoryById");
let HistoryController = class HistoryController extends boat_1.RestController {
    constructor(service) {
        super();
        this.service = service;
    }
    async getTaskStatusUpdateHistoryById(dto, req, res) {
        return res.success(await this.transform(await this.service.getStatusUpdateHistoryById(dto), new common_1.TaskStatusUpdateHistoryTransformer(), { req }));
    }
    async getTaskEtaUpdateHistoryById(dto, req, res) {
        return res.success(await this.transform(await this.service.getEtaUpdateHistoryById(dto), new common_1.TaskEtaUpdateHistoryTransformer(), { req }));
    }
};
__decorate([
    (0, common_2.Get)('status/:id'),
    (0, validator_1.Validate)(getTaskUpdateHistoryById_1.GetTaskUpdateHistoryById),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTaskUpdateHistoryById_1.GetTaskUpdateHistoryById, Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "getTaskStatusUpdateHistoryById", null);
__decorate([
    (0, common_2.Get)('eta/:id'),
    (0, validator_1.Validate)(getTaskUpdateHistoryById_1.GetTaskUpdateHistoryById),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTaskUpdateHistoryById_1.GetTaskUpdateHistoryById, Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "getTaskEtaUpdateHistoryById", null);
HistoryController = __decorate([
    (0, common_2.Controller)('history'),
    __metadata("design:paramtypes", [services_1.HistoryApiService])
], HistoryController);
exports.HistoryController = HistoryController;
//# sourceMappingURL=history.js.map