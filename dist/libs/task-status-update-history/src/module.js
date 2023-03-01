"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusUpdateHistoryLibModule = void 0;
const users_1 = require("../../users/src");
const common_1 = require("@nestjs/common");
const repositories_1 = require("./repositories");
const task_status_update_history_1 = require("./services/task-status-update-history");
let TaskStatusUpdateHistoryLibModule = class TaskStatusUpdateHistoryLibModule {
};
TaskStatusUpdateHistoryLibModule = __decorate([
    (0, common_1.Module)({
        providers: [
            task_status_update_history_1.TaskStatusUpdateHistoryLibService,
            {
                provide: users_1.RepoNames.TASK_STATUS_UPDATE_HISTORY_REPOSITORY,
                useClass: repositories_1.TaskStatusUpdateHistoryRepository,
            },
        ],
        exports: [task_status_update_history_1.TaskStatusUpdateHistoryLibService],
    })
], TaskStatusUpdateHistoryLibModule);
exports.TaskStatusUpdateHistoryLibModule = TaskStatusUpdateHistoryLibModule;
//# sourceMappingURL=module.js.map