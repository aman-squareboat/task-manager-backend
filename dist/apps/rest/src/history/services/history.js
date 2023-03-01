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
exports.HistoryApiService = void 0;
const task_eta_update_history_1 = require("../../../../../libs/task-eta-update-history/src");
const task_status_update_history_1 = require("../../../../../libs/task-status-update-history/src");
const tasks_1 = require("../../../../../libs/tasks/src");
const common_1 = require("@nestjs/common");
let HistoryApiService = class HistoryApiService {
    constructor(taskStatusUpdateHistory, taskEtaUpdateHistory, taskLibService) {
        this.taskStatusUpdateHistory = taskStatusUpdateHistory;
        this.taskEtaUpdateHistory = taskEtaUpdateHistory;
        this.taskLibService = taskLibService;
    }
    async getStatusUpdateHistoryById(input) {
        let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
        return await this.taskStatusUpdateHistory.repo.getWhere({
            taskId: task.id,
        });
    }
    async getEtaUpdateHistoryById(input) {
        let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
        return await this.taskEtaUpdateHistory.repo.getWhere({ taskId: task.id });
    }
};
HistoryApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_status_update_history_1.TaskStatusUpdateHistoryLibService,
        task_eta_update_history_1.TaskEtaUpdateHistoryLibService,
        tasks_1.TasksLibService])
], HistoryApiService);
exports.HistoryApiService = HistoryApiService;
//# sourceMappingURL=history.js.map