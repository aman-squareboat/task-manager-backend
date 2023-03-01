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
exports.TasksApiService = void 0;
const tasks_1 = require("../../../../../libs/tasks/src");
const common_1 = require("@nestjs/common");
const ulid_1 = require("ulid");
const task_status_update_history_1 = require("../../../../../libs/task-status-update-history/src");
const task_eta_update_history_1 = require("../../../../../libs/task-eta-update-history/src");
let TasksApiService = class TasksApiService {
    constructor(taskLibService, taskStatusUpdateHistoryLibService, taskEtaUpdateHistoryLibService) {
        this.taskLibService = taskLibService;
        this.taskStatusUpdateHistoryLibService = taskStatusUpdateHistoryLibService;
        this.taskEtaUpdateHistoryLibService = taskEtaUpdateHistoryLibService;
    }
    async createNewTask(input) {
        return await this.taskLibService.repo.create({
            ulid: (0, ulid_1.ulid)(),
            eta: input.eta,
            title: input.title,
            status: input.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }
    async getPaginatedTasks(input) {
        return await this.taskLibService.repo
            .query()
            .paginate(input.pageNumber, input.tasksPerPage);
    }
    async getTaskById(input) {
        return await this.taskLibService.repo.firstWhere({ ulid: input.id });
    }
    async updateTaskById(input) {
        let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
        let updated = await this.taskLibService.repo.updateWhere({ ulid: input.id }, { eta: input.eta, status: input.status });
        if (input.status >= 0 && task.status !== input.status)
            this.taskStatusUpdateHistoryLibService.repo.create({
                ulid: (0, ulid_1.ulid)(),
                taskId: task.id,
                updatedFromStatus: task.status,
                updatedToStatus: input.status,
                updatedAt: new Date().toISOString(),
            });
        if (input.eta && new Date(task.eta).toISOString() !== input.eta)
            this.taskEtaUpdateHistoryLibService.repo.create({
                ulid: (0, ulid_1.ulid)(),
                taskId: task.id,
                updatedFromEta: task.eta,
                updatedToEta: input.eta,
                updatedAt: new Date().toISOString(),
            });
        return updated;
    }
};
TasksApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_1.TasksLibService,
        task_status_update_history_1.TaskStatusUpdateHistoryLibService,
        task_eta_update_history_1.TaskEtaUpdateHistoryLibService])
], TasksApiService);
exports.TasksApiService = TasksApiService;
//# sourceMappingURL=tasks.js.map