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
exports.TasksController = void 0;
const boat_1 = require("../../../../../libs/boat/src");
const validator_1 = require("../../../../../libs/boat/src/validator");
const common_1 = require("../../../../../libs/common/src");
const common_2 = require("@nestjs/common");
const services_1 = require("../services");
const validators_1 = require("../validators");
let TasksController = class TasksController extends boat_1.RestController {
    constructor(service) {
        super();
        this.service = service;
    }
    async getAllTasks(dto, req, res) {
        let tasks = await this.service.getPaginatedTasks(dto);
        return res.success(await this.transform(tasks, new common_1.PaginateTasksTransformer(), { req }));
    }
    async getTask(dto, req, res) {
        let task = await this.service.getTaskById(dto);
        return res.success({ task });
    }
    async updateTask(dto, req, res) {
        let updated = await this.service.updateTaskById(dto);
        return res.success({
            updated: dto,
        });
    }
    async createTask(dto, req, res) {
        await this.service.createNewTask(dto);
        return res.success({
            message: 'Successfully Created',
            data: dto,
        });
    }
};
__decorate([
    (0, common_2.Get)(),
    (0, validator_1.Validate)(validators_1.GetPaginatedTasksDto),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.GetPaginatedTasksDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_2.Get)(':id'),
    (0, validator_1.Validate)(validators_1.GetTaskByIdDto),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.GetTaskByIdDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTask", null);
__decorate([
    (0, common_2.Put)(':id'),
    (0, validator_1.Validate)(validators_1.UpdateTaskByIdDto),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.UpdateTaskByIdDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_2.Post)(),
    (0, validator_1.Validate)(validators_1.CreateTaskDto),
    __param(0, (0, validator_1.Dto)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.CreateTaskDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
TasksController = __decorate([
    (0, common_2.Controller)('tasks'),
    __metadata("design:paramtypes", [services_1.TasksApiService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.js.map